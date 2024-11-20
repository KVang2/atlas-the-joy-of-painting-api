// Episodes Table
CREATE TABLE Ep (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    ep_numb INT NOT NULL,
    paint_name TEXT,
    artist_id UUID REFERENCES Artists(id)
);

// Colors Table
CREATE TABLE colors (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    name TEXT NOT NULL,
    bio TEXT
);

// Sub Table
CREATE TABLE sub