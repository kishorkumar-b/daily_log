package com.example;

import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;

@WebServlet("/addStudent")
public class StudentServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        String name = req.getParameter("name");
        String course = req.getParameter("course");

        try (Connection con = DBConnection.getConnection()) {
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO students(name, course) VALUES(?, ?)"
            );
            ps.setString(1, name);
            ps.setString(2, course);

            int rows = ps.executeUpdate();
            out.println("<h3>" + rows + " Student Added Successfully!</h3>");
        } catch (SQLException e) {
            e.printStackTrace(out);
        }
    }
}
