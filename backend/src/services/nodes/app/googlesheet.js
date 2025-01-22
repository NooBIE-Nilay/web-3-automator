import axios from "axios";
import Papa from "papaparse";

async function executeFetchGoogleSheetColumn(workflow, node, inputs) {
    // Example implementation
    const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;
    const sheetUrl = node.data.config.sheetUrl;
    const columnName = node.data.config.columnName;

    console.log("sheetUrl", sheetUrl);
    console.log("columnName", columnName);

    try {
        const csvUrl = sheetUrl
          .replace("edit", "export")
          .replace("usp", "format")
          .replace("sharing", "csv");
    
        // Fetch the CSV data from the Google Sheets URL
        const response = await axios.get(csvUrl);

        console.log("response.data", response.data);
        console.log("columnName", columnName);
    
        // Parse the CSV data into JSON format
        const { data } = Papa.parse(response.data, { header: true });
    
        // Extract data from the specified column
        const columnData = data.map((row) => row[columnName]);
    
        // Return the extracted data, filtering out undefined or empty values
        const output =  columnData.filter((value) => value !== undefined && value !== "");
        return [output, nextNodeId];
      } catch (error) {
        console.error(
          "Error extracting column data from Google Sheet:",
          error.message
        );
        return [null, nextNodeId];
      }
}

export { executeFetchGoogleSheetColumn };