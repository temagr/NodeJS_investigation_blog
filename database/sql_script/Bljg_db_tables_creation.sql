CREATE TABLE Users(
	userID int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255),
	Email varchar(255),
	Password varchar(255)
);

CREATE TABLE Posts(
	postID int IDENTITY(1,1) PRIMARY KEY,
	Title varchar(255),
	[Date] date,
	OwnerID int FOREIGN KEY REFERENCES Users(userID)
);

CREATE TABLE PostDetails(
	detailID int IDENTITY(1,1) PRIMARY KEY,
	postID int FOREIGN KEY REFERENCES Posts(postID),
	Content NVARCHAR(MAX)
);

CREATE TABLE Comments(
	commentID int IDENTITY(1,1) PRIMARY KEY,
	comentContent NVARCHAR(MAX),
	[Date] date,
	commentOwnerID int FOREIGN KEY REFERENCES Users(userID),
	postDetailID int FOREIGN KEY REFERENCES PostDetails(detailID) 
);