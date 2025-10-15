-- Enforce max 5 students per cohort
CREATE OR REPLACE FUNCTION check_cohort_student_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    max_allowed INTEGER;
BEGIN
    SELECT c.max_students INTO max_allowed
    FROM cohorts c
    WHERE c.id = NEW.cohort_id;
    
    SELECT COUNT(*) INTO current_count
    FROM cohort_students cs
    WHERE cs.cohort_id = NEW.cohort_id;
    
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
    SELECT max_students INTO max_allowed
    FROM cohorts
    WHERE id = cohort_uuid;
    
    IF max_allowed IS NULL THEN
        RETURN 0;
    END IF;
    
    SELECT COUNT(*) INTO current_count
    FROM cohort_students
    WHERE cohort_id = cohort_uuid;
    
    RETURN GREATEST(0, max_allowed - COALESCE(current_count, 0));
END;
$$ LANGUAGE plpgsql;
