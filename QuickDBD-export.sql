-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "bike_share_2017" (
    "trip_id" INT   NOT NULL,
    "trip_start_time" TIME   NOT NULL,
    "trip_stop_time" TIME   NOT NULL,
    "trip_duration_seconds" INT   NOT NULL,
    "from_station_id" INT   NOT NULL,
    "from_station_name" VARCHAR   NOT NULL,
    "to_station_id" INT   NOT NULL,
    "to_station_name" VARCHAR   NOT NULL,
    "user_type" VARCHAR   NOT NULL,
    CONSTRAINT "pk_bike_share_2017" PRIMARY KEY (
        "trip_id"
     )
);

CREATE TABLE "station_coordinate" (
    "station_id" INT   NOT NULL,
    "station_name" VARCHAR   NOT NULL,
    "lat" DECIMAL   NOT NULL,
    "lon" DECIMAL   NOT NULL,
    CONSTRAINT "pk_station_coordinate" PRIMARY KEY (
        "station_id"
     )
);

ALTER TABLE "bike_share_2017" ADD CONSTRAINT "fk_bike_share_2017_from_station_id" FOREIGN KEY("from_station_id")
REFERENCES "station_coordinate" ("station_id");

ALTER TABLE "bike_share_2017" ADD CONSTRAINT "fk_bike_share_2017_to_station_id" FOREIGN KEY("to_station_id")
REFERENCES "station_coordinate" ("station_id");

