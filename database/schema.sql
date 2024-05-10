/*lets create a query that can accept future youtube datas and store them in the database*/

/*Cities*/

CREATE TABLE IF NOT EXISTS Cities (
    "Date" TIMESTAMP,
    "Cities" TEXT,
    "City name" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Cities")
);

/*Content type*/

CREATE TABLE IF NOT EXISTS Content_type (
    "Date" TIMESTAMP,
    "Content type" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Content type")
);


/*Device type*/

CREATE TABLE IF NOT EXISTS Device_type (
    "Date" TIMESTAMP,
    "Device type" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Device type")
);

/*Geography*/

CREATE TABLE IF NOT EXISTS Geography (
    "Date" TIMESTAMP,
    "Geography" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Geography")
);


/*New and returning viewers*/

CREATE TABLE IF NOT EXISTS New_and_returning_viewers (
    "Date" TIMESTAMP,
    "New and returning viewers" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "New and returning viewers")
);


/*Oprating system*/

CREATE TABLE IF NOT EXISTS Operating_system (
    "Date" TIMESTAMP,
    "Operating system" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Operating system")
);


/*Sharing service*/

CREATE TABLE IF NOT EXISTS Sharing_service (
    "Date" TIMESTAMP,
    "Sharing service" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Sharing service")
);

/*Subscription source*/

CREATE TABLE IF NOT EXISTS Subscription_source (
    "Date" TIMESTAMP,
    "Subscription source" TEXT,
    "Subscribers" INTEGER,
    PRIMARY KEY ("Date", "Subscription source")
);

/*Subscription status*/

CREATE TABLE IF NOT EXISTS Subscription_status (
    "Date" TIMESTAMP,
    "Subscription status" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Subscription status")
);

/*Subtitles and CC*/

CREATE TABLE IF NOT EXISTS Subtitles_and_CC (
    "Date" TIMESTAMP,
    "Subtitles and CC" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Subtitles and CC")
);

/*Traffic sourse*/

CREATE TABLE IF NOT EXISTS Traffic_source (
    "Date" TIMESTAMP,
    "Traffic source" TEXT,
    "Views" INTEGER,
    PRIMARY KEY ("Date", "Traffic source")
);

/*Viewer age*/

CREATE TABLE IF NOT EXISTS Viewer_age (
    "Viewer age" TEXT,
    "Views (%)" DOUBLE PRECISION,
    "Average view duration" TEXT,
    "Average percentage viewed (%)" DOUBLE PRECISION,
    "Watch time (hours) (%)" DOUBLE PRECISION,
    PRIMARY KEY ("Viewer age")
);

/*Viwer gender*/

CREATE TABLE IF NOT EXISTS Viewer_gender (
    "Viewer gender" TEXT,
    "Views %" DOUBLE PRECISION,
    "Average view duration" TEXT,
    "Average percentage viewed (%)" DOUBLE PRECISION,
    "Watch time (hours) (%)" DOUBLE PRECISION,
    PRIMARY KEY ("Viewer gender")
);

/*Viwership by date*/

CREATE TABLE IF NOT EXISTS Viwership_by_date (
    "Date" TIMESTAMP,
    "Views" INTEGER,
    "Watch time (hours)" DOUBLE PRECISION,
    "Average view duration" TEXT,
    PRIMARY KEY ("Date")
);