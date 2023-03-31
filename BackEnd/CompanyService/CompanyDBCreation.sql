use insurance;

CREATE TABLE `company` (
  `companyId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NULL,
  `address` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `postalCode` VARCHAR(6) NOT NULL,
  `logo` LONGBLOB NULL,
  `contactDetails` JSON NULL,
  `isApproved` bool NOT NULL DEFAULT false,
  `adminViewed` bool NOT NULL DEFAULT false,
  `dateRegistered` DATETIME NULL,
  `dateApproved` DATETIME NULL,
  PRIMARY KEY (`companyId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

insert into company (email, name, description, address, city, state, country, postalCode, logo, contactDetails, isApproved, adminViewed, dateRegistered, dateApproved)
values("comp2@gmail.com", "ABC Insurance", "The best auto insurance in Edmonton! You break it, we guarantee it's fixed.", "123 St 20 Ave", "Edmonton", "Alberta", "Canada", "T1T1E1", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"abc_insurance", "Facebook":"abc_insurance"}', true, true, '2023-03-01 00:00:00', '2023-03-11 01:02:40'),
("comp3@gmail.com", "LOTR", "A quote guaranteed in your inbox within 3 hours. Choose local!", "1235 St SW", "Calgary", "Alberta", "Canada", "I3I6Y6", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"lotr"}', false, false, '2023-03-05 12:30:00', null),
("comp4@gmail.com", "Testing", "Easiest online claim submission in the nation. Get approved today.", "Antarctica Ave", "Calgary", "Alberta", "Canada", "Y8U3E4", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"testing", "Facebook":"testing"}', true, true, '2023-03-09 18:45:00', '2023-03-23 08:02:10'),
("comp5@gmail.com", "Permanent Crashers", "The best auto insurance in the nation. Break your car, we guarantee a quick fix.", "25 South Pole", "Toronto", "Ontario", "Canada", "G8GH4E", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"permanent_crashers"}', false, false, '2023-03-11 08:15:00', null),
("comp6@gmail.com", "Cars R Us", "Crashed your car? We've got you covered! Choose from our extensive collection of insurance products today!", "653 Avenue", "Ottawa", "Ontario", "Canada", "Q4R6Y8", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"cars_r_us"}', true, true, '2023-03-15 17:00:00', '2023-03-20 06:15:30'),
("comp7@gmail.com", "Done4Today", "The quickest claim processing in the nation. Visit our large collection of products today!", "Jump Street 123", "Montreal", "Quebec", "Canada", "T5Y6F4", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"done_4_today", "Facebook":"done_4_today"}', true, true, '2023-03-18 14:20:00', '2023-03-23 17:25:40'),
("comp8@gmail.com", "iCompany", "We are the nation's largest insurance proviers. Book a consultation today!", "987 North Pole", "Toronto", "Ontario", "Canada", "J9G3F6", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"i_company"}', false, true, '2023-03-20 09:30:00', null),
("comp9@gmail.com", "Builders", "We are Canada's most reliable home insurance providers. Call us today!", "Strange Avenue 65", "Ottawa", "Ontario", "Canada", "H3V5B6", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"builders", "Facebook":"builders"}', false, true, '2023-03-23 19:00:00', '2023-03-30 21:23:45'),
("comp10@gmail.com", "Generous Horse", "The most generous insurance providers. Made by locals, supporting locals.", "45th Dangerous Road", "Montreal", "Quebec", "Canada", "G5D6E8", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"generous_horse"}', true, true, '2023-03-26 11:45:00', '2023-03-30 10:55:12'),
("comp11@gmail.com", "Deals Deals Deals", "Browse our large collection of insurance deals - the lowest in the nation!", "Mt Doom 25", "Calgary", "Alberta", "Canada", "K9H8J4", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"deals_deals_deals", "Facebook":"dealsdealsdeals"}', false, true, '2023-03-29 22:15:00', '2023-03-31 09:36:49'),
("comp12@gmail.com", "Genie Bottle", "We believe in magic: get your claims processed within 1 hour. Check out our products today!", "45612 St 25 Ave", "Red Deer", "Alberta", "Canada", "D8N5H7", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"genie_bottle", "Facebook":"genie"}', false, false, '2023-03-02 16:30:00', null),
("comp13@gmail.com", "Pop Rocks", "The most reliable auto insurance providers in Red Deer. Visit us today!", "98 st 45 Ave NE", "Red Deer", "Alberta", "Canada", "K0B8U2", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"pop_rocks", "Facebook":"pop_rocks"}', false, false, '2023-03-12 11:00:00', null),
("comp14@gmail.com", "Laptop is Broken", "Looking for fast claim processing and generous insurance coverage? Look no further! We provide everything from home to auto insurance. We've got you covered!", "Ducky Ave", "Edmonton", "Alberta", "Canada", "L1B0P3", "no image", '{"Phone":"7859634512", "Fax":"4561237896", "Instagram":"laptop_is_broken"}', true, true, '2023-03-28 08:45:00', '2023-03-29 11:45:50');