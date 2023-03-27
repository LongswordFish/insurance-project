use company;

select * from company;

delete from company where name like '%XUNIT%';

insert into company (email, name, address, logo, contactDetails, isApproved)
values("comp2@gmail.com", "ABC Insurance", "123 St 20 Ave", "no image", '{"Instagram":"abc_insurance", "Facebook":"abc_insurance"}', true),
("comp3@gmail.com", "LOTR", "1235 St SW", "no image", '{"Instagram":"lotr"}', false),
("comp4@gmail.com", "Testing", "Antarctica Ave", "no image", '{"Instagram":"testing", "Facebook":"testing"}', true),
("comp5@gmail.com", "Permanent Crashers", "25 South Pole", "no image", '{"Instagram":"permanent_crashers"}', false),
("comp6@gmail.com", "Cars R Us", "653 Avenue", "no image", '{"Instagram":"cars_r_us"}', true),
("comp7@gmail.com", "Done4Today", "Jump Street 123", "no image", '{"Instagram":"done_4_today", "Facebook":"done_4_today"}', true),
("comp8@gmail.com", "iCompany", "987 North Pole", "no image", '{"Instagram":"i_company"}', false),
("comp9@gmail.com", "Builders", "Strange Avenue 65", "no image", '{"Instagram":"builders", "Facebook":"builders"}', true),
("comp10@gmail.com", "Generous Horse", "45th Dangerous Road", "no image", '{"Instagram":"generous_horse"}', true),
("comp11@gmail.com", "Deals Deals Deals", "Mt Doom 25", "no image", '{"Instagram":"deals_deals_deals", "Facebook":"dealsdealsdeals"}', false),
("comp12@gmail.com", "Genie Bottle", "Somewhere in Canada", "no image", '{"Instagram":"genie_bottle", "Facebook":"genie"}', false),
("comp13@gmail.com", "Pop Rocks", "98 st 45 Ave NE", "no image", '{"Instagram":"pop_rocks", "Facebook":"pop_rocks"}', false),
("comp14@gmail.com", "Laptop is Broken", "Ducky Ave", "no image", '{"Instagram":"laptop_is_broken"}', true);

CREATE TABLE `company` (
  `companyId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `logo` LONGBLOB NULL,
  `contactDetails` JSON NULL,
  `isApproved` bool NOT NULL DEFAULT false,
  PRIMARY KEY (`companyId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

drop table company;