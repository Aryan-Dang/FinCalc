-- TODO: Uses the event queue. Requires periodic (preferable hourly) rollups.
--       Also requires the trigger which can be found in the create-events-table migration
--       commented out.
---      We are not yet at a scale where we need this one.
-- CREATE OR REPLACE FUNCTION queue_calc_event(
--     _visitor_uuid UUID,
--     _session_uuid UUID,
--     _calculator_uuid UUID,
--     _client_uuid UUID,
--     _event_type VARCHAR(128),
--     _payload JSON
-- ) RETURNS INTEGER AS $$
-- DECLARE
--     event_id INTEGER;
-- BEGIN
    
--     IF EXISTS (
--         SELECT 1 FROM calc_events
--         WHERE
--             calc_events.visitor_uuid = _visitor_uuid AND
--             calc_events.session_uuid = _session_uuid AND
--             calc_events.calculator_uuid = _calculator_uuid AND
--             calc_events.event_type = _event_type || '.unique'
--     ) THEN -- Not Unique
--         INSERT INTO calc_events(visitor_uuid, session_uuid, calculator_uuid, client_uuid, event_type, payload)
--         VALUES (
--             _visitor_uuid, _session_uuid, 
--             _calculator_uuid, _client_uuid, 
--             _event_type,
--             _payload)
--         RETURNING id INTO event_id;
--     ELSE -- Unique
--         INSERT INTO calc_events(visitor_uuid, session_uuid, calculator_uuid, client_uuid, event_type, payload)
--         VALUES (
--             _visitor_uuid, _session_uuid, 
--             _calculator_uuid, _client_uuid, 
--             _event_type || '.unique', 
--             _payload)
--         RETURNING id INTO event_id;
--     END IF;

--     RETURN event_id;
-- END
-- $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION push_calc_event(
    _visitor_uuid UUID,
    _session_uuid UUID,
    _calculator_uuid UUID,
    _client_uuid UUID,
    _o_event_type VARCHAR(128),
    _payload JSON
) RETURNS INTEGER AS $$
DECLARE
    event_id INTEGER;
    _event_type VARCHAR(128);
    create_time TIMESTAMP WITH TIME ZONE;
BEGIN
    IF EXISTS (
        SELECT 1 FROM calc_events
        WHERE
            calc_events.visitor_uuid = _visitor_uuid AND
            calc_events.session_uuid = _session_uuid AND
            calc_events.calculator_uuid = _calculator_uuid AND
            calc_events.event_type = _o_event_type || '.unique'
    ) THEN -- Not Unique
        _event_type := _o_event_type;
    ELSE -- Unique
        _event_type := _o_event_type || '.unique';
    END IF;

    create_time := now();

    -- Insert the full event into the events table.
    INSERT INTO calc_events(visitor_uuid, session_uuid, calculator_uuid, client_uuid, event_type, payload)
    VALUES (
        _visitor_uuid, _session_uuid, 
        _calculator_uuid, _client_uuid, 
        _event_type,
        _payload)
    RETURNING id INTO event_id;

    -- By Calculator By Hour:
    INSERT INTO calc_events_by_hour (event_count, event_type, calculator_uuid, hour)
        VALUES (1, _event_type, _calculator_uuid, date_trunc('hour', create_time))
        ON CONFLICT (event_type, calculator_uuid, hour) DO UPDATE
        SET event_count = calc_events_by_hour.event_count + excluded.event_count;

    -- By Calculator By Day
    INSERT INTO calc_events_by_day (event_count, event_type, calculator_uuid, day)
        VALUES (1, _event_type, _calculator_uuid, date_trunc('day', create_time))
        ON CONFLICT (event_type, calculator_uuid, day) DO UPDATE
        SET event_count = calc_events_by_day.event_count + excluded.event_count;

    -- By Client By Hour
    INSERT INTO client_calc_events_by_hour (event_count, event_type, client_uuid, hour)
        VALUES (1, _event_type, _client_uuid, date_trunc('hour', create_time))
        ON CONFLICT (event_type, client_uuid, hour) DO UPDATE
        SET event_count = client_calc_events_by_hour.event_count + excluded.event_count;
    
    -- By Client By Day
    INSERT INTO client_calc_events_by_day (event_count, event_type, client_uuid, day)
        VALUES (1, _event_type, _client_uuid, date_trunc('day', create_time))
        ON CONFLICT (event_type, client_uuid, day) DO UPDATE
        SET event_count = client_calc_events_by_day.event_count + excluded.event_count;

    RETURN event_id;
END
$$ LANGUAGE plpgsql;

-- #TODO: rollups not required at the moment.
-- CREATE OR REPLACE FUNCTION rollup_calculator_events() 
-- RETURNS void AS $$
-- DECLARE last_processed_id INTEGER;
-- BEGIN
--     -- First we get our queued up events.
--     WITH queued_event AS (
--         SELECT event.id, event.event_type, event.calculator_uuid, event.client_uuid, event.created
--         FROM calc_events_queue queue_event
--         LEFT JOIN calc_events event ON event.id = queue_event.event_id
--         WHERE 1=1
--     ), 
    
--     -- Group Events By Calculator
--     by_calc_by_hour AS (
--         SELECT count(id) AS event_count, event_type, calculator_uuid, date_trunc('hour', created) AS hour
--         FROM queued_event
--         GROUP BY event_type, calculator_uuid, date_trunc('hour', created)
--     ),
--     by_calc_by_day AS (
--         SELECT count(id) AS event_count, event_type, calculator_uuid, created::date AS day
--         FROM queued_event
--         GROUP BY event_type, calculator_uuid, created::date
--     ),

--     -- Group Events By Client
--     by_client_by_hour AS (
--         SELECT count(id) AS event_count, event_type, client_uuid, date_trunc('hour', created) AS hour
--         FROM queued_event
--         GROUP BY event_type, client_uuid, date_trunc('hour', created)
--     ),
--     by_client_by_day AS (
--         SELECT count(id) AS event_count, event_type, client_uuid, created::date AS day
--         FROM queued_event
--         GROUP BY event_type, client_uuid, created::date
--     ),

--     -- Rollup Events By Calculator
--     update_by_calc_by_hour AS (
--         INSERT INTO calc_events_by_hour
--         SELECT * FROM by_calc_by_hour
--         ON CONFLICT (event_type, calculator_uuid, hour) DO UPDATE
--         SET event_count = calc_events_by_hour.event_count + excluded.event_count
--     ),
--     update_by_calc_by_day AS (
--         INSERT INTO calc_events_by_day
--         SELECT * FROM by_calc_by_day
--         ON CONFLICT (event_type, calculator_uuid, day) DO UPDATE
--         SET event_count = calc_events_by_day.event_count + excluded.event_count
--     ),
    
--     -- Rollup Events By Client
--     update_by_client_by_hour AS (
--         INSERT INTO client_calc_events_by_hour
--         SELECT * FROM by_client_by_hour
--         ON CONFLICT (event_type, client_uuid, hour) DO UPDATE
--         SET event_count = client_calc_events_by_hour.event_count + excluded.event_count
--     ),
--     update_by_client_by_day AS (
--         INSERT INTO client_calc_events_by_day
--         SELECT * FROM by_client_by_day
--         ON CONFLICT (event_type, client_uuid, day) DO UPDATE
--         SET event_count = client_calc_events_by_day.event_count + excluded.event_count
--     ),
    
--     -- Some cleanup by setting events as processed.
--     update_processed_events AS (
--         UPDATE calc_events
--         SET processed = TRUE
--         FROM queued_event
--         WHERE calc_events.id = queued_event.id
--     )
--     SELECT MAX(queued_event.id) INTO last_processed_id FROM queued_event;

--     -- Then we remove the events that we processed:
--     DELETE FROM calc_events_queue
--     WHERE event_id <= last_processed_id;
-- END
-- $$ LANGUAGE plpgsql;