package com.example;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Log4jexApplication {
    private static final Logger logger = LogManager.getLogger(Log4jexApplication.class);

    public static void main(String[] args) {
        logger.info("Application started...");
        
        try {
            int result = 10 / 2;
            logger.debug("Calculation result: " + result);
        } catch (Exception e) {
            logger.error("Error occurred: ", e);
        }

        logger.warn("This is a warning message!");
        logger.info("Application finished successfully!");
    }
}
