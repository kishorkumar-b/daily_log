package com.example.dbswitch.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DbConfig {

    @Value("${app.use-sqlserver}")
    private boolean useSqlServer;

    @Value("${spring.datasource.url}")
    private String sqlUrl;
    @Value("${spring.datasource.username}")
    private String sqlUser;
    @Value("${spring.datasource.password}")
    private String sqlPass;

    @Value("${postgres.url}")
    private String pgUrl;
    @Value("${postgres.username}")
    private String pgUser;
    @Value("${postgres.password}")
    private String pgPass;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();

        if (useSqlServer) {
            System.out.println("✅ Using SQL Server Database");
            ds.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            ds.setUrl(sqlUrl);
            ds.setUsername(sqlUser);
            ds.setPassword(sqlPass);
        } else {
            System.out.println("🟦 Using PostgreSQL Database");
            ds.setDriverClassName("org.postgresql.Driver");
            ds.setUrl(pgUrl);
            ds.setUsername(pgUser);
            ds.setPassword(pgPass);
        }

        return ds;
    }
}
