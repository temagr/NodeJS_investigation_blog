USE [Blog]
GO

/****** Object:  Table [dbo].[Rates]    Script Date: 15.05.2017 10:55:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Rates](
	[rateID] [int] IDENTITY(1,1) NOT NULL,
	[postID] [int] NULL,
	[userID] [int] NULL,
	[rate] [float] NULL,
UNIQUE NONCLUSTERED 
(
	[rateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Rates]  WITH CHECK ADD FOREIGN KEY([postID])
REFERENCES [dbo].[Posts] ([postID])
GO

ALTER TABLE [dbo].[Rates]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userID])
GO


