use company;

select * from company;

delete from company where name like '%XUNIT%';

insert into company (email, name, address, city, state, country, postalCode, logo, contactDetails, isApproved)
values("comp2@gmail.com", "ABC Insurance", "123 St 20 Ave", "Edmonton", "Alberta", "Canada", "T1T1E1", "no image", '{"Instagram":"abc_insurance", "Facebook":"abc_insurance"}', true),
("comp3@gmail.com", "LOTR", "1235 St SW", "Calgary", "Alberta", "Canada", "I3I6Y6", "no image", '{"Instagram":"lotr"}', false),
("comp4@gmail.com", "Testing", "Antarctica Ave", "Calgary", "Alberta", "Canada", "Y8U3E4", "no image", '{"Instagram":"testing", "Facebook":"testing"}', true),
("comp5@gmail.com", "Permanent Crashers", "25 South Pole", "Toronto", "Ontario", "Canada", "G8GH4E", "no image", '{"Instagram":"permanent_crashers"}', false),
("comp6@gmail.com", "Cars R Us", "653 Avenue", "Ottawa", "Ontario", "Canada", "Q4R6Y8", "no image", '{"Instagram":"cars_r_us"}', true),
("comp7@gmail.com", "Done4Today", "Jump Street 123", "Montreal", "Quebec", "Canada", "T5Y6F4", "no image", '{"Instagram":"done_4_today", "Facebook":"done_4_today"}', true),
("comp8@gmail.com", "iCompany", "987 North Pole", "Toronto", "Ontario", "Canada", "J9G3F6", "no image", '{"Instagram":"i_company"}', false),
("comp9@gmail.com", "Builders", "Strange Avenue 65", "Ottawa", "Ontario", "Canada", "H3V5B6", "no image", '{"Instagram":"builders", "Facebook":"builders"}', true),
("comp10@gmail.com", "Generous Horse", "45th Dangerous Road", "Montreal", "Quebec", "Canada", "G5D6E8", "no image", '{"Instagram":"generous_horse"}', true),
("comp11@gmail.com", "Deals Deals Deals", "Mt Doom 25", "Calgary", "Alberta", "Canada", "K9H8J4", "no image", '{"Instagram":"deals_deals_deals", "Facebook":"dealsdealsdeals"}', false),
("comp12@gmail.com", "Genie Bottle", "45612 St 25 Ave", "Red Deer", "Alberta", "Canada", "D8N5H7", "no image", '{"Instagram":"genie_bottle", "Facebook":"genie"}', false),
("comp13@gmail.com", "Pop Rocks", "98 st 45 Ave NE", "Red Deer", "Alberta", "Canada", "K0B8U2", "no image", '{"Instagram":"pop_rocks", "Facebook":"pop_rocks"}', false),
("comp14@gmail.com", "Laptop is Broken", "Ducky Ave", "Edmonton", "Alberta", "Canada", "L1B0P3", "no image", '{"Instagram":"laptop_is_broken"}', true);

CREATE TABLE `company` (
  `companyId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `postalCode` VARCHAR(6) NOT NULL,
  `logo` LONGBLOB NULL,
  `contactDetails` JSON NULL,
  `isApproved` bool NOT NULL DEFAULT false,
  PRIMARY KEY (`companyId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

drop table company;