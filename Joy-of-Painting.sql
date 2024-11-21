// Episodes Table
CREATE TABLE episode (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    episode INT NOT NULL,
    season INT NOT NULL,
    broadcast_date DATE NOT NULL
);

// painting Table
CREATE TABLE painting (
    id UUID PRIMARY KEY,
    painting_index INT NOT NULL,
    img_src TEXT NOT NULL,
    title TEXT NOT NULL,
    num_colors INT NOT NULL,
    youtube_src TEXT NOT NULL,
    episode_id UUID REFERENCES episodes(id)
);

// Subject Table
CREATE TABLE subject (
    id UUID PRIMARY KEY,
    episode INT NOT NULL,
    title TEXT NOT NULL,
    obj TEXT NOT NULL
);

// Colors Table
CREATE TABLE colors (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    hex_code TEXT NOT NULL
);
