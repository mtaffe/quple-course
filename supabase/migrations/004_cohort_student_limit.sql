-- Enforce max 5 students per cohort
CREATE OR REPLACE FUNCTION check_cohort_student_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    max_allowed INTEGER;
BEGIN
    SELECT COUNT(*), c.max_students
    INTO current_count, max_allowed
    FROM cohort_students cs
    JOIN cohorts c ON c.id = cs.cohort_id
    WHERE cs.cohort_id = NEW.cohort_id
    GROUP BY c.max_students;
    
    IF current_count >= max_allowed THEN
        RAISE EXCEPTION 'Cohort is full. Maximum % students allowed.', max_allowed;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_cohort_student_limit
    BEFORE INSERT ON cohort_students
    FOR EACH ROW
    EXECUTE FUNCTION check_cohort_student_limit();

-- Add helper function to get available spots
CREATE OR REPLACE FUNCTION get_cohort_available_spots(cohort_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    current_count INTEGER;
    max_allowed INTEGER;
BEGIN
    SELECT COUNT(*), c.max_students
    INTO current_count, max_allowed
    FROM cohort_students cs
    JOIN cohorts c ON c.id = cs.cohort_id
    WHERE cs.cohort_id = cohort_uuid
    GROUP BY c.max_students;
    
    IF current_count IS NULL THEN
        SELECT max_students INTO max_allowed FROM cohorts WHERE id = cohort_uuid;
        RETURN COALESCE(max_allowed, 0);
    END IF;
    
    RETURN max_allowed - current_count;
END;
$$ LANGUAGE plpgsql;
