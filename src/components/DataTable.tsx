import React, { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { SortDirection } from "../types/SortDirection";
import TablePagination from "./TablePagination";

interface MetricData {
  timestamp: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}

interface DataTableProps {
  metrics: MetricData[];
}

const DataTable: React.FC<DataTableProps> = ({ metrics }) => {
  const [filter, setFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MetricData;
    direction: "ascending" | "descending";
  } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const requestSort = (key: keyof MetricData) => {
    let direction: SortDirection = SortDirection.Ascending;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === SortDirection.Ascending
    ) {
      direction = SortDirection.Descending;
    }
    setSortConfig({ key, direction });
  };

  //sort function
  const sortedMetrics = React.useMemo(() => {
    let sortableMetrics = [...metrics];
    if (sortConfig !== null) {
      sortableMetrics.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) {
          return sortConfig.direction === SortDirection.Ascending ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === SortDirection.Ascending ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableMetrics;
  }, [metrics, sortConfig]);

  const filteredMetrics = sortedMetrics.filter((metric) =>
    Object.values(metric).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Calculate the data for the current page
  const metricsData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMetrics.slice(startIndex, endIndex);
  }, [filteredMetrics, currentPage]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredMetrics.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //sort icon
  const getSortIcon = (key: keyof MetricData) => {
    if (!sortConfig) return <FontAwesomeIcon icon={faSort} />;
    if (sortConfig.key === key) {
      return sortConfig.direction === SortDirection.Ascending ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  return (
    <div className="data-table">
      <Form.Group controlId="filter">
        <Form.Control
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={handleFilterChange}
          style={{ width: "30%" }}
        />
      </Form.Group>
      <Table striped="columns" responsive bordered hover>
        <thead>
          <tr>
            <th
              onClick={() => requestSort("timestamp")}
              style={{ cursor: "pointer" }}
            >
              Timestamp {getSortIcon("timestamp")}
            </th>
            <th
              onClick={() => requestSort("impressions")}
              style={{ cursor: "pointer" }}
            >
              Impressions {getSortIcon("impressions")}
            </th>
            <th
              onClick={() => requestSort("clicks")}
              style={{ cursor: "pointer" }}
            >
              Clicks {getSortIcon("clicks")}
            </th>
            <th
              onClick={() => requestSort("cost")}
              style={{ cursor: "pointer" }}
            >
              Cost {getSortIcon("cost")}
            </th>
            <th
              onClick={() => requestSort("conversions")}
              style={{ cursor: "pointer" }}
            >
              Conversions {getSortIcon("conversions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {metricsData.map((metric, index) => (
            <tr key={index}>
              <td>{metric.timestamp}</td>
              <td>{metric.impressions}</td>
              <td>{metric.clicks}</td>
              <td>{metric.cost}</td>
              <td>{metric.conversions}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTable;
