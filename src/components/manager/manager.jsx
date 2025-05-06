import { useDispatch, useSelector } from "react-redux";
import { getAllCustomersThunk } from "../../redux/Slices/Customer/getAllCustomersThunk";
import { useState, useEffect } from "react";
import { getAllInvesteesThunk } from "../../redux/Slices/investee/getAllInvesteesThunk";
import { delCustomerThunk } from "../../redux/Slices/Customer/deleteCustomerThunk";
import { updateCustomerThunk } from "../../redux/Slices/Customer/updateCustomerThunk";
import { useNavigate } from "react-router-dom";
import "./manager.css";
import { deleteInvesteeThunk } from "../../redux/Slices/investee/deleteInvesteeThunk";
import { updateInvesteerThunk } from "../../redux/Slices/investee/updateInvesteeThunk";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Manager = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector(state => state.customers.customers);
  const allInvestees = useSelector(state => state.investees.investees);
  const allRequests = useSelector(state => state.requests?.requests || []);

  const [isManager, setIsManager] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const manager = "1234";
  // const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentId, setCurrentId] = useState();
  const [currentId2, setCurrentId2] = useState();
  const [insure, setInsure] = useState(false);
  const [insure2, setInsure2] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalInvestors: 0,
    totalPropertyOwners: 0,
    pendingRequestsCount: 0,
    recentActivity: []
  });

  const [editInvestee, setEditInvestee] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    address: ""
  });

  const [editCustomer, setEditCustomer] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    address: ""
  });

  // Mock data for charts
  const pieChartData = {
    labels: ['Investors', 'Property Owners', 'Pending Requests'],
    datasets: [
      {
        label: 'Platform Statistics',
        data: [allCustomers?.length || 0, allInvestees?.length || 0, pendingRequests?.length || 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Investors',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'New Property Owners',
        data: [8, 15, 7, 9, 12, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  useEffect(() => {
    setIsLoaded(true);

    // Simulate fetching pending requests
    const mockPendingRequests = [
      { id: 1, customerId: "101", investeeId: "201", status: "pending", date: "2023-05-15", amount: 50000 },
      { id: 2, customerId: "102", investeeId: "202", status: "pending", date: "2023-05-16", amount: 75000 },
      { id: 3, customerId: "103", investeeId: "203", status: "pending", date: "2023-05-17", amount: 100000 },
    ];

    setPendingRequests(mockPendingRequests);

    // Update dashboard stats
    setDashboardStats({
      totalInvestors: allCustomers?.length || 0,
      totalPropertyOwners: allInvestees?.length || 0,
      pendingRequestsCount: mockPendingRequests.length,
      recentActivity: [
        { type: "new_investor", user: "John Doe", date: "2023-05-18" },
        { type: "new_property", owner: "Jane Smith", date: "2023-05-17" },
        { type: "new_request", investor: "Mike Johnson", amount: "$75,000", date: "2023-05-16" }
      ]
    });

    // Pre-fetch data if manager is logged in
    if (isManager) {
      dispatch(getAllCustomersThunk());
      dispatch(getAllInvesteesThunk());
      // Add dispatch for requests when available
    }
  }, [isManager, dispatch, allCustomers, allInvestees]);

  const checkManager = () => {
    if (currentPassword === manager) {
      setIsManager(true);
      setLoginError(false);

      // Fetch data immediately after login
      dispatch(getAllCustomersThunk());
      dispatch(getAllInvesteesThunk());
    } else {
      setLoginError(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkManager();
    }
  };

  const approveRequest = (requestId) => {
    // Implement request approval logic
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    alert(`Request #${requestId} has been approved`);
  };

  const rejectRequest = (requestId) => {
    // Implement request rejection logic
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    alert(`Request #${requestId} has been rejected`);
  };

  const filteredCustomers = allCustomers?.filter(customer =>
    customer.id !== "" &&
    (customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber?.includes(searchTerm) ||
      customer.address?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const filteredInvestees = allInvestees?.filter(investee =>
    investee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investee.phoneNumber?.includes(searchTerm) ||
    investee.address?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="manager-container">
      {!isManager ? (
        <div className={`login-panel ${isLoaded ? 'loaded' : ''}`}>
          <div className="login-header">
            <div className="manager-icon">🤵🏻</div>
            <h1>Manager Portal</h1>
            <p>Enter your password to access the management dashboard</p>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label htmlFor="password">Manager Password</label>
              <input
                type="password"
                id="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className={loginError ? 'error' : ''}
                placeholder="Enter password"
              />
              {loginError && <div className="error-message">Invalid password. Please try again.</div>}
            </div>

            <div className="login-actions">
              <button className="login-button" onClick={checkManager}>Login</button>
              {/* <button className="back-button" onClick={() => navigate('/home')}>Back to Home</button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={`dashboard-container ${isLoaded ? 'loaded' : ''}`}>
          <div className="dashboard-sidebar">
            <div className="sidebar-header">
              <h2>Investment Manager</h2>
              <div className="manager-avatar">👨‍💼</div>
            </div>

            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </button>
              <button
                className={`nav-item ${activeTab === 'investors' ? 'active' : ''}`}
                onClick={() => setActiveTab('investors')}
              >
                <span className="nav-icon">👥</span>
                Investors
              </button>
              <button
                className={`nav-item ${activeTab === 'investees' ? 'active' : ''}`}
                onClick={() => setActiveTab('investees')}
              >
                <span className="nav-icon">🏢</span>
                Property Owners
              </button>
              <button
                className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`}
                onClick={() => setActiveTab('requests')}
              >
                <span className="nav-icon">📝</span>
                Pending Requests
                {pendingRequests.length > 0 && (
                  <span className="badge">{pendingRequests.length}</span>
                )}
              </button>
              <button
                className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <span className="nav-icon">📈</span>
                Reports & Analytics
              </button>
            </nav>

            <div className="sidebar-footer">
              <button className="logout-button" >
                <span className="nav-icon">🚪</span>
                Exit Dashboard
              </button>
            </div>
          </div>

          <div className="dashboard-main">
            <div className="dashboard-header">
              <div className="header-title">
                {activeTab === 'dashboard' && <h1>Dashboard Overview</h1>}
                {activeTab === 'investors' && <h1>Investor Management</h1>}
                {activeTab === 'investees' && <h1>Property Owner Management</h1>}
                {activeTab === 'requests' && <h1>Pending Investment Requests</h1>}
                {activeTab === 'reports' && <h1>Reports & Analytics</h1>}
              </div>

              <div className="header-actions">
                {(activeTab === 'investors' || activeTab === 'investees') && (
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                  </div>
                )}

                <div className="notification-center">
                  <button
                    className="notification-button"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    🔔
                    {pendingRequests.length > 0 && (
                      <span className="notification-badge">{pendingRequests.length}</span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="notification-dropdown">
                      <div className="notification-header">
                        <h3>Notifications</h3>
                      </div>
                      <div className="notification-list">
                        {pendingRequests.length > 0 ? (
                          pendingRequests.map(req => (
                            <div key={req.id} className="notification-item">
                              <div className="notification-icon">📝</div>
                              <div className="notification-content">
                                <div className="notification-title">New Investment Request</div>
                                <div className="notification-info">Amount: ${req.amount}</div>
                                <div className="notification-date">{req.date}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-notifications">No new notifications</div>
                        )}
                      </div>
                      <div className="notification-footer">
                        <button onClick={() => setActiveTab('requests')}>View All Requests</button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="refresh-button"
                  onClick={() => {
                    dispatch(getAllCustomersThunk());
                    dispatch(getAllInvesteesThunk());
                  }}
                >
                  🔄 Refresh
                </button>
              </div>
            </div>

            <div className="dashboard-content">
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="dashboard-overview">
                  <div className="stats-cards">
                    <div className="stat-card">
                      <div className="stat-icon investors-icon">👥</div>
                      <div className="stat-content">
                        <div className="stat-value">{dashboardStats.totalInvestors}</div>
                        <div className="stat-label">Total Investors</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon properties-icon">🏢</div>
                      <div className="stat-content">
                        <div className="stat-value">{dashboardStats.totalPropertyOwners}</div>
                        <div className="stat-label">Property Owners</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon requests-icon">📝</div>
                      <div className="stat-content">
                        <div className="stat-value">{dashboardStats.pendingRequestsCount}</div>
                        <div className="stat-label">Pending Requests</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon money-icon">💰</div>
                      <div className="stat-content">
                        <div className="stat-value">$2.4M</div>
                        <div className="stat-label">Total Investments</div>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-charts">
                    <div className="chart-container">
                      <h3>Platform Overview</h3>
                      <div className="pie-chart">
                        <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                      </div>
                    </div>

                    <div className="chart-container">
                      <h3>Growth Trends</h3>
                      <div className="bar-chart">
                        <Bar
                          data={barChartData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              title: {
                                display: true,
                                text: 'Monthly Growth'
                              },
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                      {dashboardStats.recentActivity.map((activity, index) => (
                        <div key={index} className="activity-item">
                          {activity.type === "new_investor" && (
                            <>
                              <div className="activity-icon">👤</div>
                              <div className="activity-content">
                                <div className="activity-title">New Investor Registered</div>
                                <div className="activity-details">{activity.user}</div>
                                <div className="activity-date">{activity.date}</div>
                              </div>
                            </>
                          )}
                          {activity.type === "new_property" && (
                            <>
                              <div className="activity-icon">🏢</div>
                              <div className="activity-content">
                                <div className="activity-title">New Property Owner Added</div>
                                <div className="activity-details">{activity.owner}</div>
                                <div className="activity-date">{activity.date}</div>
                              </div>
                            </>
                          )}
                          {activity.type === "new_request" && (
                            <>
                              <div className="activity-icon">📝</div>
                              <div className="activity-content">
                                <div className="activity-title">New Investment Request</div>
                                <div className="activity-details">
                                  {activity.investor} - {activity.amount}
                                </div>
                                <div className="activity-date">{activity.date}</div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                      <button onClick={() => setActiveTab('investors')}>
                        <span className="action-icon">👥</span>
                        Manage Investors
                      </button>
                      <button onClick={() => setActiveTab('investees')}>
                        <span className="action-icon">🏢</span>
                        Manage Property Owners
                      </button>
                      <button onClick={() => setActiveTab('requests')}>
                        <span className="action-icon">📝</span>
                        Review Pending Requests
                      </button>
                      <button onClick={() => setActiveTab('reports')}>
                        <span className="action-icon">📊</span>
                        Generate Reports
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* INVESTORS TAB */}
              {activeTab === 'investors' && (
                <div className="investors-panel">
                  <div className="panel-header">
                    <h2>Registered Investors</h2>
                    <button
                      className="action-button2"
                      onClick={() => dispatch(getAllCustomersThunk())}
                    >
                      Load All Investors
                    </button>
                  </div>

                  {filteredCustomers.length > 0 ? (
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCustomers.map(customer => (
                            <tr key={customer.id}>
                              <td>{customer.id}</td>
                              <td>{customer.name}</td>
                              <td>{customer.phoneNumber}</td>
                              <td>{customer.address}</td>
                              <td>
                                <span className="status-badge active">Active</span>
                              </td>
                              <td className="actions-cell">
                                <button
                                  className="view-button"
                                  onClick={() => {
                                    // View investor details
                                    alert(`Viewing details for ${customer.name}`);
                                  }}
                                >
                                  <span className="action-icon">👁️</span>
                                </button>
                                <button
                                  className="edit-button"
                                  onClick={() => {
                                    setCurrentId(customer.id);
                                    setEditCustomer(customer);
                                    setIsEdit(true);
                                  }}
                                >
                                  <span className="action-icon">✏️</span>
                                </button>
                                <button
                                  className="delete-button"
                                  onClick={() => {
                                    setCurrentId(customer.id);
                                    setInsure(true);
                                  }}
                                >
                                  <span className="action-icon">🗑️</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">
                      <div className="no-data-icon">🔍</div>
                      <p>No investors found. Click "Load All Investors" to fetch data.</p>
                    </div>
                  )}
                </div>
              )}

              {/* PROPERTY OWNERS TAB */}
              {activeTab === 'investees' && (
                <div className="investees-panel">
                  <div className="panel-header">
                    <h2>Registered Property Owners</h2>
                    <button
                      className="action-button2"
                      onClick={() => dispatch(getAllInvesteesThunk())}
                    >
                      Load All Property Owners
                    </button>
                  </div>

                  {filteredInvestees.length > 0 ? (
                    <div className="investees-grid">
                      {filteredInvestees.map(investee => (
                        <div key={investee.id} className="investee-card">
                          <div className="card-header">
                            <h3>{investee.name}</h3>
                            <span className="status-badge active">Active</span>
                          </div>

                          <div className="investee-details">
                            <div className="detail-item">
                              <span className="detail-icon">🆔</span>
                              <span className="detail-label">ID:</span>
                              <span className="detail-value">{investee.id}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-icon">📞</span>
                              <span className="detail-label">Phone:</span>
                              <span className="detail-value">{investee.phoneNumber}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-icon">📍</span>
                              <span className="detail-label">Address:</span>
                              <span className="detail-value">{investee.address}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-icon">🏢</span>
                              <span className="detail-label">Properties:</span>
                              <span className="detail-value">3</span>
                            </div>
                          </div>

                          <div className="investee-actions">
                            <button
                              className="view-button"
                              onClick={() => {
                                // View property owner details
                                alert(`Viewing details for ${investee.name}`);
                              }}
                            >
                              <span className="action-icon">👁️</span>
                              View
                            </button>
                            <button
                              className="edit-button"
                              onClick={() => {
                                setCurrentId2(investee.id);
                                setEditInvestee(investee);
                                setIsEdit2(true);
                              }}
                            >
                              <span className="action-icon">✏️</span>
                              Edit
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => {
                                setCurrentId2(investee.id);
                                setInsure2(true);
                              }}
                            >
                              <span className="action-icon">🗑️</span>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-data">
                      <div className="no-data-icon">🔍</div>
                      <p>No property owners found. Click "Load All Property Owners" to fetch data.</p>
                    </div>
                  )}
                </div>
              )}

              {/* PENDING REQUESTS TAB */}
              {activeTab === 'requests' && (
                <div className="requests-panel">
                  <div className="panel-header">
                    <h2>Pending Investment Requests</h2>
                    <div className="filter-controls">
                      <select defaultValue="all">
                        <option value="all">All Requests</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button className="refresh-button">
                        <span className="action-icon">🔄</span>
                        Refresh
                      </button>
                    </div>
                  </div>

                  {pendingRequests.length > 0 ? (
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Request ID</th>
                            <th>Investor</th>
                            <th>Property Owner</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingRequests.map(request => (
                            <tr key={request.id}>
                              <td>#{request.id}</td>
                              <td>
                                {allCustomers.find(c => c.id === request.customerId)?.name ||
                                  `Investor #${request.customerId}`}
                              </td>
                              <td>
                                {allInvestees.find(i => i.id === request.investeeId)?.name ||
                                  `Property Owner #${request.investeeId}`}
                              </td>
                              <td className="amount">${request.amount.toLocaleString()}</td>
                              <td>{request.date}</td>
                              <td>
                                <span className="status-badge pending">Pending</span>
                              </td>
                              <td className="actions-cell">
                                <button
                                  className="view-button"
                                  onClick={() => {
                                    // View request details
                                    alert(`Viewing details for Request #${request.id}`);
                                  }}
                                >
                                  <span className="action-icon">👁️</span>
                                </button>
                                <button
                                  className="approve-button"
                                  onClick={() => approveRequest(request.id)}
                                >
                                  <span className="action-icon">✅</span>
                                </button>
                                <button
                                  className="reject-button"
                                  onClick={() => rejectRequest(request.id)}
                                >
                                  <span className="action-icon">❌</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-data">
                      <div className="no-data-icon">📝</div>
                      <p>No pending requests found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* REPORTS & ANALYTICS TAB */}
              {activeTab === 'reports' && (
                <div className="reports-panel">
                  <div className="panel-header">
                    <h2>Reports & Analytics</h2>
                  </div>

                  <div className="reports-grid">
                    <div className="report-card">
                      <div className="report-header">
                        <h3>Investment Summary</h3>
                        <button className="export-button">
                          <span className="action-icon">📊</span>
                          Export
                        </button>
                      </div>
                      <div className="report-content">
                        <div className="report-chart">
                          <Bar
                            data={{
                              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                              datasets: [
                                {
                                  label: 'Investment Volume',
                                  data: [350000, 450000, 550000, 650000],
                                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                        </div>
                        <div className="report-summary">
                          <div className="summary-item">
                            <span className="summary-label">Total Volume:</span>
                            <span className="summary-value">$2,000,000</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Growth Rate:</span>
                            <span className="summary-value">+23.5%</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Avg. Investment:</span>
                            <span className="summary-value">$75,000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="report-card">
                      <div className="report-header">
                      
                      <h3>User Activity</h3>
                        <button className="export-button">
                          <span className="action-icon">📊</span>
                          Export
                        </button>
                      </div>
                      <div className="report-content">
                        <div className="report-chart">
                          <Pie
                            data={{
                              labels: ['Active Investors', 'Inactive Investors', 'Active Property Owners', 'Inactive Property Owners'],
                              datasets: [
                                {
                                  label: 'User Activity',
                                  data: [65, 15, 45, 10],
                                  backgroundColor: [
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(75, 192, 192, 0.2)',
                                  ],
                                }
                              ]
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                        </div>
                        <div className="report-summary">
                          <div className="summary-item">
                            <span className="summary-label">Total Users:</span>
                            <span className="summary-value">135</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Active Rate:</span>
                            <span className="summary-value">81.5%</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">New This Month:</span>
                            <span className="summary-value">12</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="report-card full-width">
                      <div className="report-header">
                        <h3>Investment Performance</h3>
                        <div className="date-range">
                          <label>Date Range:</label>
                          <select defaultValue="year">
                            <option value="month">Last Month</option>
                            <option value="quarter">Last Quarter</option>
                            <option value="year">Last Year</option>
                            <option value="all">All Time</option>
                          </select>
                        </div>
                      </div>
                      <div className="report-content">
                        <div className="performance-metrics">
                          <div className="metric-card">
                            <div className="metric-icon">📈</div>
                            <div className="metric-value">18.7%</div>
                            <div className="metric-label">Avg. ROI</div>
                          </div>
                          <div className="metric-card">
                            <div className="metric-icon">⏱️</div>
                            <div className="metric-value">2.3 yrs</div>
                            <div className="metric-label">Avg. Duration</div>
                          </div>
                          <div className="metric-card">
                            <div className="metric-icon">🏆</div>
                            <div className="metric-value">$125K</div>
                            <div className="metric-label">Highest Return</div>
                          </div>
                          <div className="metric-card">
                            <div className="metric-icon">📊</div>
                            <div className="metric-value">97.2%</div>
                            <div className="metric-label">Success Rate</div>
                          </div>
                        </div>

                        <div className="top-performers">
                          <h4>Top Performing Investments</h4>
                          <table className="performers-table">
                            <thead>
                              <tr>
                                <th>Property</th>
                                <th>Investor</th>
                                <th>Amount</th>
                                <th>ROI</th>
                                <th>Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Luxury Apartments</td>
                                <td>John Smith</td>
                                <td>$250,000</td>
                                <td>24.5%</td>
                                <td>1.8 yrs</td>
                              </tr>
                              <tr>
                                <td>Commercial Complex</td>
                                <td>Sarah Johnson</td>
                                <td>$350,000</td>
                                <td>22.1%</td>
                                <td>2.2 yrs</td>
                              </tr>
                              <tr>
                                <td>Residential Tower</td>
                                <td>Michael Brown</td>
                                <td>$180,000</td>
                                <td>21.8%</td>
                                <td>1.5 yrs</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="report-card">
                      <div className="report-header">
                        <h3>Generate Custom Report</h3>
                      </div>
                      <div className="report-content">
                        <div className="custom-report-form">
                          <div className="form-group">
                            <label>Report Type</label>
                            <select defaultValue="investment">
                              <option value="investment">Investment Summary</option>
                              <option value="user">User Activity</option>
                              <option value="performance">Performance Metrics</option>
                              <option value="financial">Financial Statement</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Date Range</label>
                            <div className="date-inputs">
                              <input type="date" placeholder="Start Date" />
                              <span>to</span>
                              <input type="date" placeholder="End Date" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Include Sections</label>
                            <div className="checkbox-group">
                              <label>
                                <input type="checkbox" defaultChecked /> Summary
                              </label>
                              <label>
                                <input type="checkbox" defaultChecked /> Charts
                              </label>
                              <label>
                                <input type="checkbox" defaultChecked /> Detailed Data
                              </label>
                              <label>
                                <input type="checkbox" /> Recommendations
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Format</label>
                            <div className="radio-group">
                              <label>
                                <input type="radio" name="format" defaultChecked /> PDF
                              </label>
                              <label>
                                <input type="radio" name="format" /> Excel
                              </label>
                              <label>
                                <input type="radio" name="format" /> CSV
                              </label>
                            </div>
                          </div>
                          <button className="generate-button">
                            <span className="action-icon">📊</span>
                            Generate Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EDIT INVESTOR MODAL */}
          {isEdit && (
            <div className="modal-overlay">
              <div className="modal edit-modal">
                <div className="modal-header">
                  <h2>Edit Investor</h2>
                  <button className="close-button" onClick={() => setIsEdit(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editCustomer.name}
                      onChange={e => setEditCustomer({ ...editCustomer, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={editCustomer.phoneNumber}
                      onChange={e => setEditCustomer({ ...editCustomer, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={editCustomer.address}
                      onChange={e => setEditCustomer({ ...editCustomer, address: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select defaultValue="active">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending Verification</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="save-button"
                    onClick={() => {
                      dispatch(updateCustomerThunk(editCustomer));
                      setIsEdit(false);
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EDIT PROPERTY OWNER MODAL */}
          {isEdit2 && (
            <div className="modal-overlay">
              <div className="modal edit-modal">
                <div className="modal-header">
                  <h2>Edit Property Owner</h2>
                  <button className="close-button" onClick={() => setIsEdit2(false)}>×</button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editInvestee.name}
                      onChange={e => setEditInvestee({ ...editInvestee, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={editInvestee.phoneNumber}
                      onChange={e => setEditInvestee({ ...editInvestee, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={editInvestee.address}
                      onChange={e => setEditInvestee({ ...editInvestee, address: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select defaultValue="active">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending Verification</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="save-button"
                    onClick={() => {
                      dispatch(updateInvesteerThunk(editInvestee));
                      setIsEdit2(false);
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEdit2(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE INVESTOR CONFIRMATION MODAL */}
          {insure && (
            <div className="modal-overlay">
              <div className="modal confirm-modal">
                <div className="modal-header">
                  <h2>Confirm Deletion</h2>
                </div>
                <div className="modal-body">
                  <div className="warning-icon">⚠️</div>
                  <p>Are you sure you want to delete this investor permanently?</p>
                  <p className="warning">This action cannot be undone and will remove all associated investment records.</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="delete-button"
                    onClick={() => {
                      setInsure(false);
                      dispatch(delCustomerThunk(currentId));
                      dispatch(getAllCustomersThunk());
                    }}
                  >
                    Delete Permanently
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setInsure(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE PROPERTY OWNER CONFIRMATION MODAL */}
          {insure2 && (
            <div className="modal-overlay">
              <div className="modal confirm-modal">
                <div className="modal-header">
                  <h2>Confirm Deletion</h2>
                </div>
                <div className="modal-body">
                  <div className="warning-icon">⚠️</div>
                  <p>Are you sure you want to delete this property owner permanently?</p>
                  <p className="warning">This action cannot be undone and will remove all associated property records.</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="delete-button"
                    onClick={() => {
                      setInsure2(false);
                      dispatch(deleteInvesteeThunk(currentId2));
                      dispatch(getAllInvesteesThunk());
                    }}
                  >
                    Delete Permanently
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setInsure2(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
