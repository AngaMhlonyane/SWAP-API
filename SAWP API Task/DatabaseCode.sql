CREATE TABLE cached_results (
    id SERIAL PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    result JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- Databse fails to connect to MongoDB, tried it with MongoDB Desktop app and tried it with cloud one connections fail.