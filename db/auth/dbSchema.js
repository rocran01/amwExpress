// CREATE TABLE `key` (
//     `id` int(11) NOT NULL,
//     `idproperty` int(11) NOT NULL,
//     `keysType` varchar(60) DEFAULT NULL,
//     `keysNotes` varchar(100) NOT NULL,
//     `noKeys` int(11) NOT NULL,
//     `keySets` int(11) NOT NULL,
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
//   CREATE TABLE `klocation` (
//     `idkLocation` int(11) NOT NULL AUTO_INCREMENT,
//     `propertyID` int(11) DEFAULT NULL,
//     `locationID` varchar(4) NOT NULL,
//     `history` char(50) DEFAULT NULL,
//     PRIMARY KEY (`idkLocation`),
//     UNIQUE KEY `idkLocation_UNIQUE` (`idkLocation`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=661 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='key location';
  
//   CREATE TABLE `klocationdata` (
//     `idkLocationData` int(11) NOT NULL,
//     `klocationID` varchar(10) DEFAULT NULL,
//     `history` json DEFAULT NULL,
//     PRIMARY KEY (`idkLocationData`),
//     UNIQUE KEY `klocationID_UNIQUE` (`klocationID`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
//   CREATE TABLE `property` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `propertyAddress1` varchar(70) NOT NULL,
//     `propertyAddress2` varchar(100) NOT NULL,
//     `propertyPostCode` varchar(12) NOT NULL,
//     `propertyKeySets` int(11) NOT NULL,
//     PRIMARY KEY (`id`),
//     UNIQUE KEY `idproperty_UNIQUE` (`id`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=588 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Property details';
  
//   CREATE TABLE `propgeolocation` (
//     `id` int(11) NOT NULL AUTO_INCREMENT,
//     `lat` float NOT NULL,
//     `lng` float NOT NULL,
//     `label` varchar(10) NOT NULL,
//     `animation` varchar(10) DEFAULT NULL,
//     PRIMARY KEY (`id`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
//   CREATE TABLE `users` (
//     `idUser` int(11) NOT NULL AUTO_INCREMENT,
//     `firstName` varchar(20) NOT NULL,
//     `lastName` varchar(20) NOT NULL,
//     `email` varchar(25) NOT NULL,
//     `password` varchar(45) DEFAULT NULL,
//     `apiKey` varchar(50) DEFAULT NULL,
//     PRIMARY KEY (`idUser`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Users';
  