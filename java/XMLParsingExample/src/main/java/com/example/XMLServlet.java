package com.example;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import javax.xml.parsers.*;
import org.w3c.dom.*;

@WebServlet("/showXML")
public class XMLServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        try {
            // Path to the XML file (inside webapp)
            String xmlFilePath = getServletContext().getRealPath("/students.xml");

            // 1️⃣ Create DocumentBuilder
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();

            // 2️⃣ Parse the XML file
            Document doc = builder.parse(new File(xmlFilePath));
            doc.getDocumentElement().normalize();

            // 3️⃣ Read all <student> elements
            NodeList nodeList = doc.getElementsByTagName("student");

            out.println("<html><body>");
            out.println("<h2>📘 Student Details (From XML)</h2>");
            out.println("<table border='1' cellpadding='8'>");
            out.println("<tr><th>ID</th><th>Name</th><th>Course</th></tr>");

            for (int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);

                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element e = (Element) node;

                    String id = e.getElementsByTagName("id").item(0).getTextContent();
                    String name = e.getElementsByTagName("name").item(0).getTextContent();
                    String course = e.getElementsByTagName("course").item(0).getTextContent();

                    out.println("<tr><td>" + id + "</td><td>" + name + "</td><td>" + course + "</td></tr>");
                }
            }

            out.println("</table>");
            out.println("</body></html>");

        } catch (Exception e) {
            e.printStackTrace(out);
        }
    }
}
