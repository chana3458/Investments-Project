// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "./investments.css";

// // This would be a thunk action to fetch available investments
// // import { getAllAvailableInvestmentsThunk } from "../../redux/Slices/investments/getAllAvailableInvestmentsThunk";

// export const Investments = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedInvestment, setSelectedInvestment] = useState(null);
  
//   // This would be the actual data from Redux
//   // const availableInvestments = useSelector(state => state.investments.availableInvestments);
  
//   // Sample data for demonstration
//   const [availableInvestments, setAvailableInvestments] = useState([
//     {
//       id: "inv1",
//       title: "Luxury Apartment Complex",
//       location: "Tel Aviv, Israel",
//       type: "residential",
//       price: 2500000,
//       roi: 12.5,
//       term: 60, // months
//       minInvestment: 50000,
//       description: "A premium apartment complex in the heart of Tel Aviv with 24 units. High rental demand area with consistent appreciation.",
//       features: ["24 Units", "Pool", "Gym", "Security", "Parking"],
//       images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
//       investmentProgress: 65, // percentage funded
//       investorCount: 18,
//       expectedCompletion: "2024-12-01"
//     },
//     {
//       id: "inv2",
//       title: "Commercial Office Building",
//       location: "Jerusalem, Israel",
//       type: "commercial",
//       price: 4800000,
//       roi: 9.8,
//       term: 84, // months
//       minInvestment: 100000,
//       description: "Prime commercial property in Jerusalem's business district. Fully leased with long-term corporate tenants.",
//       features: ["5 Floors", "Modern Design", "Conference Center", "Parking Garage", "24/7 Access"],
//       images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
//       investmentProgress: 42, // percentage funded
//       investorCount: 9,
//       expectedCompletion: "2025-06-15"
//     },
//     {
//       id: "inv3",
//       title: "Beachfront Villa Development",
//       location: "Herzliya, Israel",
//       type: "luxury",
//       price: 8500000,
//       roi: 15.2,
//       term: 48, // months
//       minInvestment: 250000,
//       description: "Exclusive development of 8 luxury beachfront villas in Herzliya. Premium finishes and direct beach access.",
//       features: ["Beachfront", "Private Pools", "Smart Home", "Luxury Finishes", "Concierge Service"],
//       images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
//       investmentProgress: 28, // percentage funded
//       investorCount: 5,
//       expectedCompletion: "2024-08-30"
//     },
//     {
//       id: "inv4",
//       title: "Mixed-Use Development",
//       location: "Haifa, Israel",
//       type: "mixed",
//       price: 3700000,
//       roi: 11.3,
//       term: 72, // months
//       minInvestment: 75000,
//       description: "Strategic mixed-use development in Haifa combining retail spaces on ground floor with residential units above.",
//       features: ["Retail Spaces", "Residential Units", "Central Location", "Public Transportation", "Green Spaces"],
//       images: ["https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
//       investmentProgress: 51, // percentage funded
//       investorCount: 14,
//       expectedCompletion: "2025-03-10"
//     },
//     {
//       id: "inv5",
//       title: "Student Housing Complex",
//       location: "Beer Sheva, Israel",
//       type: "residential",
//       price: 1900000,
//       roi: 13.7,
//       term: 60, // months
//       minInvestment: 30000,
//       description: "Purpose-built student accommodation near Ben-Gurion University. Consistently high occupancy rates.",
//       features: ["200 Units", "Study Rooms", "Cafeteria", "Laundry Facilities", "Security"],
//       images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
//       investmentProgress: 78, // percentage funded
//       investorCount: 23,
//       expectedCompletion: "2024-05-20"
//     },
//     {
//       id: "inv6",
//       title: "Industrial Warehouse Park",
//       location: "Ashdod, Israel",
//       type: "industrial",
//       price: 5200000,
//       roi: 10.5,
//       term: 96, // months
//       minInvestment: 120000,
//       description: "Modern industrial warehouse park in Ashdod's logistics zone. Strategic location near port facilities.",
//       features: ["10 Units", "Loading Docks", "Security Systems", "Office Spaces", "24/7 Access"],
//       images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
//       investmentProgress: 35, // percentage funded
//       investorCount: 7,
//       expectedCompletion: "2025-11-15"
//     }
//   ]);
  
//   useEffect(() => {
//     // In a real application, you would dispatch the thunk to fetch data
//     // dispatch(getAllAvailableInvestmentsThunk());
    
//     setIsLoaded(true);
//   }, []);
  
//   const filteredInvestments = availableInvestments.filter(investment => {
//     // Filter by type
//     if (activeFilter !== "all" && investment.type !== activeFilter) {
//       return false;
//     }
    
//     // Filter by search term
//     if (searchTerm && !investment.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !investment.location.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false;
//     }
    
//     return true;
//   });
  
//   const handleInvestmentClick = (investment) => {
//     setSelectedInvestment(investment);
//   };
  
//   const handleInvestNow = (investmentId) => {
//     // Navigate to investment details or investment form
//     navigate(`/investment/${investmentId}`);
//   };
  
//   return (
//     <div className="available-investments-container">
//       <div className={`investments-header ${isLoaded ? 'loaded' : ''}`}>
//         <h1>Available Investment Opportunities</h1>
//         <p>Discover premium real estate investment opportunities curated for maximum returns</p>
//       </div>
      
//       <div className={`search-filter-container ${isLoaded ? 'loaded' : ''}`}>
//         <div className="search-box">
//           <input 
//             type="text" 
//             placeholder="Search by property name or location..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="search-button">
//             🔍
//           </button>
//         </div>
        
//         <div className="filter-options">
//           <button 
//             className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
//             onClick={() => setActiveFilter('all')}
//           >
//             All Properties
//           </button>
//           <button 
//             className={`filter-button ${activeFilter === 'residential' ? 'active' : ''}`}
//             onClick={() => setActiveFilter('residential')}
//           >
//             Residential
//           </button>
//           <button 
//             className={`filter-button ${activeFilter === 'commercial' ? 'active' : ''}`}
//             onClick={() => setActiveFilter('commercial')}
//           >
//             Commercial
//           </button>
//           <button 
//             className={`filter-button ${activeFilter === 'luxury' ? 'active' : ''}`}
//             onClick={() => setActiveFilter('luxury')}
//           >
//             Luxury
//           </button>
//           <button 
//             className={`filter-button ${activeFilter === 'industrial' ? 'active' : ''}`}
//             onClick={() => setActiveFilter('industrial')}
//           >
//             Industrial
//           </button>
//           <button 
//             className={`filter-button ${activeFilter === 'mixed' ? 'active' : ''}`}
//             onClick={() => setActiveFilter('mixed')}
//           >
//             Mixed-Use
//           </button>
//         </div>
//       </div>
      
//       {filteredInvestments.length > 0 ? (
//         <div className="investments-grid">
//           {filteredInvestments.map((investment, index) => (
//             <div 
//               key={investment.id} 
//               className={`investment-card ${isLoaded ? 'loaded' : ''}`}
//               style={{ animationDelay: `${0.1 * index}s` }}
//               onClick={() => handleInvestmentClick(investment)}
//             >
//               <div className="investment-image">
//                 <img src={investment.images[0]} alt={investment.title} />
//                 <div className="investment-type">{investment.type}</div>
//                 <div className="investment-progress-container">
//                   <div 
//                     className="investment-progress-bar" 
//                     style={{ width: `${investment.investmentProgress}%` }}
//                   ></div>
//                   <span className="investment-progress-text">{investment.investmentProgress}% Funded</span>
//                 </div>
//               </div>
              
//               <div className="investment-details">
//                 <h2>{investment.title}</h2>
//                 <div className="investment-location">
//                   <span className="location-icon"></span> {investment.location}
//                 </div>
                
//                 <div className="investment-stats">
//                   <div className="stat">
//                     <span className="stat-value">{investment.roi}%</span>
//                     <span className="stat-label">Projected ROI</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">${(investment.minInvestment).toLocaleString()}</span>
//                     <span className="stat-label">Min Investment</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">{investment.term} mo</span>
//                     <span className="stat-label">Term</span>
//                   </div>
//                 </div>
                
//                 <p className="investment-description">{investment.description.substring(0, 100)}...</p>
                
//                 <div className="investment-features">
//                   {investment.features.slice(0, 3).map((feature, i) => (
//                     <span key={i} className="feature-tag">{feature}</span>
//                   ))}
//                   {investment.features.length > 3 && (
//                     <span className="feature-tag more-tag">+{investment.features.length - 3} more</span>
//                   )}
//                 </div>
                
//                 <div className="investment-footer">
//                   <div className="investor-count">
//                     <span className="investor-icon">👥</span> {investment.investorCount} Investors
//                   </div>
//                   <button 
//                     className="invest-button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleInvestNow(investment.id);
//                     }}
//                   >
//                     Invest Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-investments">
//           <div className="no-results-icon">🔍</div>
//           <h2>No investment opportunities found</h2>
//           <p>Try adjusting your search criteria or check back later for new opportunities</p>
//           <button 
//             className="reset-button"
//             onClick={() => {
//               setActiveFilter("all");
//               setSearchTerm("");
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}
      
//       {selectedInvestment && (
//         <div className="modal-overlay" onClick={() => setSelectedInvestment(null)}>
//           <div className="investment-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setSelectedInvestment(null)}>×</button>
            
//             <div className="modal-image-gallery">
//               <img src={selectedInvestment.images[0]} alt={selectedInvestment.title} />
//             </div>
            
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h2>{selectedInvestment.title}</h2>
//                 <div className="investment-location">
//                   <span className="location-icon"></span> {selectedInvestment.location}
//                 </div>
//               </div>
              
//               <div className="modal-stats">
//                 <div className="modal-stat">
//                   <span className="stat-value">${(selectedInvestment.price).toLocaleString()}</span>
//                   <span className="stat-label">Total Value</span>
//                 </div>
//                 <div className="modal-stat">
//                   <span className="stat-value">{selectedInvestment.roi}%</span>
//                   <span className="stat-label">Projected ROI</span>
//                 </div>
//                 <div className="modal-stat">
//                   <span className="stat-value">${(selectedInvestment.minInvestment).toLocaleString()}</span>
//                   <span className="stat-label">Min Investment</span>
//                 </div>
//                 <div className="modal-stat">
//                   <span className="stat-value">{selectedInvestment.term} mo</span>
//                   <span className="stat-label">Term Length</span>
//                 </div>
//               </div>
              
              
//   <div className="funding-progress">
//                 <h3>Funding Progress</h3>
//                 <div className="modal-progress-container">
//                   <div 
//                     className="modal-progress-bar" 
//                     style={{ width: `${selectedInvestment.investmentProgress}%` }}
//                   ></div>
//                   <span className="modal-progress-text">
//                     {selectedInvestment.investmentProgress}% Funded
//                   </span>
//                 </div>
//                 <div className="funding-details">
//                   <div className="funding-stat">
//                     <span className="funding-label">Investors:</span>
//                     <span className="funding-value">{selectedInvestment.investorCount}</span>
//                   </div>
//                   <div className="funding-stat">
//                     <span className="funding-label">Completion Date:</span>
//                     <span className="funding-value">
//                       {new Date(selectedInvestment.expectedCompletion).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="investment-description-full">
//                 <h3>Property Description</h3>
//                 <p>{selectedInvestment.description}</p>
//               </div>
              
//               <div className="investment-features-full">
//                 <h3>Property Features</h3>
//                 <div className="features-grid">
//                   {selectedInvestment.features.map((feature, i) => (
//                     <div key={i} className="feature-item">
//                       <span className="feature-icon">✓</span>
//                       <span className="feature-text">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="investment-documents">
//                 <h3>Investment Documents</h3>
//                 <div className="documents-list">
//                   <a href="#" className="document-link">
//                     <span className="document-icon">📄</span>
//                     <span className="document-name">Investment Prospectus</span>
//                   </a>
//                   <a href="#" className="document-link">
//                     <span className="document-icon">📄</span>
//                     <span className="document-name">Financial Projections</span>
//                   </a>
//                   <a href="#" className="document-link">
//                     <span className="document-icon">📄</span>
//                     <span className="document-name">Property Assessment</span>
//                   </a>
//                   <a href="#" className="document-link">
//                     <span className="document-icon">📄</span>
//                     <span className="document-name">Legal Documentation</span>
//                   </a>
//                 </div>
//               </div>
              
//               <div className="modal-actions">
//                 <button 
//                   className="modal-invest-button"
//                   onClick={() => handleInvestNow(selectedInvestment.id)}
//                 >
//                   Invest Now
//                 </button>
//                 <button className="schedule-viewing-button">
//                   Schedule Viewing
//                 </button>
//                 <button className="contact-manager-button">
//                   Contact Investment Manager
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./investments.css";

export const Investments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const availableInvestments = useSelector(state => state.investments.investments);
  let newFeatures="";
  // דוגמת נתונים של עסקים להשקעה
  //const [availableInvestments, setAvailableInvestments] = useState([
  //   {
  //     id: "biz1",
  //     title: "Coffee Shop Chain",
  //     location: "Tel Aviv, Israel",
  //     type: "food & beverage",
  //     price: 1200000,
  //     roi: 18.3,
  //     term: 36, // חודשים
  //     minInvestment: 30000,
  //     description: "Established coffee shop chain with 5 branches in prime locations. Strong customer base and growing revenue.",
  //     features: ["5 Branches", "Loyal Customers", "Franchise Potential", "Modern Equipment", "Experienced Staff"],
  //     images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
  //     investmentProgress: 70,
  //     investorCount: 12,
  //     expectedCompletion: "2024-11-01"
  //   },
  //   {
  //     id: "biz2",
  //     title: "Tech Startup - SaaS Platform",
  //     location: "Jerusalem, Israel",
  //     type: "technology",
  //     price: 3500000,
  //     roi: 25.7,
  //     term: 48,
  //     minInvestment: 100000,
  //     description: "Innovative SaaS platform with a growing user base and recurring revenue model. Positioned for rapid scale.",
  //     features: ["SaaS Model", "Recurring Revenue", "Scalable", "Experienced Team", "Patented Technology"],
  //     images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
  //     investmentProgress: 55,
  //     investorCount: 8,
  //     expectedCompletion: "2025-04-15"
  //   },
  //   {
  //     id: "biz3",
  //     title: "Boutique Hotel",
  //     location: "Eilat, Israel",
  //     type: "hospitality",
  //     price: 4800000,
  //     roi: 14.2,
  //     term: 60,
  //     minInvestment: 150000,
  //     description: "Charming boutique hotel with 30 rooms located in a prime tourist area. High occupancy rates year-round.",
  //     features: ["30 Rooms", "Prime Location", "High Occupancy", "Spa & Wellness", "Restaurant"],
  //     images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
  //     investmentProgress: 40,
  //     investorCount: 10,
  //     expectedCompletion: "2025-09-30"
  //   },
  //   {
  //     id: "biz4",
  //     title: "Organic Farm",
  //     location: "Galilee, Israel",
  //     type: "agriculture",
  //     price: 900000,
  //     roi: 12.8,
  //     term: 36,
  //     minInvestment: 20000,
  //     description: "Sustainable organic farm producing fresh vegetables and fruits with established distribution channels.",
  //     features: ["Organic Certified", "Greenhouse Facilities", "Distribution Network", "Experienced Farmers", "Eco-Friendly"],
  //     images: ["https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
  //     investmentProgress: 80,
  //     investorCount: 15,
  //     expectedCompletion: "2024-10-10"
  //   },
  //   {
  //     id: "biz5",
  //     title: "Fitness Center Chain",
  //     location: "Haifa, Israel",
  //     type: "health & wellness",
  //     price: 2200000,
  //     roi: 16.5,
  //     term: 48,
  //     minInvestment: 50000,
  //     description: "Three fitness centers with modern equipment and loyal membership base. Opportunities for expansion.",
  //     features: ["3 Locations", "Modern Equipment", "Personal Trainers", "Group Classes", "Membership Growth"],
  //     images: ["https://images.unsplash.com/photo-1554284126-1e8e4a0b8b3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
  //     investmentProgress: 60,
  //     investorCount: 9,
  //     expectedCompletion: "2025-02-20"
  //   },
  //   {
  //     id: "biz6",
  //     title: "E-commerce Retailer",
  //     location: "Beer Sheva, Israel",
  //     type: "retail",
  //     price: 1800000,
  //     roi: 20.1,
  //     term: 36,
  //     minInvestment: 40000,
  //     description: "Fast-growing online retailer specializing in electronics with strong brand recognition and customer loyalty.",
  //     features: ["Online Platform", "Strong Brand", "Customer Loyalty", "Fast Delivery", "Diverse Product Range"],
  //     images: ["https://images.unsplash.com/photo-1515165562835-cb8a7a0f1e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"],
  //     investmentProgress: 75,
  //     investorCount: 14,
  //     expectedCompletion: "2024-12-05"
  //   }
  // ]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredInvestments = availableInvestments.filter(investment => {
    debugger
    if (activeFilter !== "all" && investment.type.trim() !== activeFilter.trim()) {
   
      return false;
    }
    if (searchTerm && !investment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !investment.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
  };

  const handleInvestNow = (investmentId) => {
    navigate(`/investment/${investmentId}`);
  };

  return (
    <div className="available-investments-container">
      <div className={`investments-header ${isLoaded ? 'loaded' : ''}`}>
        <h1>Available Business Investment Opportunities</h1>
        <p>Discover premium business investment opportunities curated for maximum returns</p>
      </div>

      <div className={`search-filter-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search by business name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            🔍
          </button>
        </div>

        <div className="filter-options">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Businesses
          </button>
          
          <button 
            className={`filter-button ${activeFilter === 'food & beverage' ? 'active' : ''}`}
            onClick={() => setActiveFilter('food & beverage')}
          >
            
            Food & Beverage
          </button>
          <button 
            className={`filter-button ${activeFilter === 'technology' ? 'active' : ''}`}
            onClick={() => setActiveFilter('technology')}
          >
            Technology
          </button>
          <button 
            className={`filter-button ${activeFilter === 'hospitality' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hospitality')}
          >
            Hospitality
          </button>
          <button 
            className={`filter-button ${activeFilter === 'agriculture' ? 'active' : ''}`}
            onClick={() => setActiveFilter('agriculture')}
          >
            Agriculture
          </button>
          <button 
            className={`filter-button ${activeFilter === 'health & wellness' ? 'active' : ''}`}
            onClick={() => setActiveFilter('health & wellness')}
          >
            Health & Wellness
          </button>
          <button 
            className={`filter-button ${activeFilter === 'retail' ? 'active' : ''}`}
            onClick={() => setActiveFilter('retail')}
          >
            Retail
          </button>
        </div>
      </div>

      {filteredInvestments.length > 0 ? (
        <div className="investments-grid">
          {filteredInvestments.map((investment, index) => (
            <div 
              key={investment.id} 
              className={`investment-card ${isLoaded ? 'loaded' : ''}`}
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => handleInvestmentClick(investment)}
            >
              <div className="investment-image">
                <img src={investment.images[0]} alt={investment.title} />
                <div className="investment-type">{investment.type}</div>
                <div className="investment-progress-container">
                  <div 
                    className="investment-progress-bar" 
                    style={{ width: `${investment.investmentProgress}%` }}
                  ></div>
                  <span className="investment-progress-text">{investment.investmentProgress}% Funded</span>
                </div>
              </div>

              <div className="investment-details">
                <h2>{investment.title}</h2>
                <div className="investment-location">
                  <span className="location-icon"></span> {investment.location}
                </div>

                <div className="investment-stats">
                  <div className="stat">
                    <span className="stat-value">{investment.roi}%</span>
                    <span className="stat-label">Projected ROI</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">${(investment.minInvestment).toLocaleString()}</span>
                    <span className="stat-label">Min Investment</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{investment.term} mo</span>
                    <span className="stat-label">Term</span>
                  </div>
                </div>

                <p className="investment-description">{investment.description.substring(0, 100)}...</p>

                <div className="investment-features">
                  
                { newFeatures = investment.features.split(',').map(f => f.trim())}

                  {newFeatures.slice(0, 3).map((feature, i) => (
                    <span key={i} className="feature-tag">{feature}</span>
                  ))}
                  {investment.features.length > 3 && (
                    <span className="feature-tag more-tag">+{investment.features.length - 3} more</span>
                  )}
                </div>

                <div className="investment-footer">
                  <div className="investor-count">
                    <span className="investor-icon">👥</span> {investment.investorCount} Investors
                  </div>
                  <button 
                    className="invest-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInvestNow(investment.id);
                    }}
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-investments">
          <div className="no-results-icon">🔍</div>
          <h2>No business investment opportunities found</h2>
          <p>Try adjusting your search criteria or check back later for new opportunities</p>
          <button 
            className="reset-button"
            onClick={() => {
              setActiveFilter("all");
              setSearchTerm("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {selectedInvestment && (
        <div className="modal-overlay" onClick={() => setSelectedInvestment(null)}>
          <div className="investment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedInvestment(null)}>×</button>

            <div className="modal-image-gallery">
              <img src={selectedInvestment.images[0]} alt={selectedInvestment.title} />
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedInvestment.title}</h2>
                <div className="investment-location">
                  <span className="location-icon"></span> {selectedInvestment.location}
                </div>
              </div>

              <div className="modal-stats">
                <div className="modal-stat">
                  <span className="stat-value">${(selectedInvestment.price).toLocaleString()}</span>
                  <span className="stat-label">Total Value</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-value">{selectedInvestment.roi}%</span>
                  <span className="stat-label">Projected ROI</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-value">${(selectedInvestment.minInvestment).toLocaleString()}</span>
                  <span className="stat-label">Min Investment</span>
                </div>
                <div className="modal-stat">
                  <span className="stat-value">{selectedInvestment.term} mo</span>
                  <span className="stat-label">Term Length</span>
                </div>
              </div>

              <div className="funding-progress">
                <h3>Funding Progress</h3>
                <div className="modal-progress-container">
                  <div 
                    className="modal-progress-bar" 
                    style={{ width: `${selectedInvestment.investmentProgress}%` }}
                  ></div>
                  <span className="modal-progress-text">
                    {selectedInvestment.investmentProgress}% Funded
                  </span>
                </div>
                <div className="funding-details">
                  <div className="funding-stat">
                    <span className="funding-label">Investors:</span>
                    <span className="funding-value">{selectedInvestment.investorCount}</span>
                  </div>
                  <div className="funding-stat">
                    <span className="funding-label">Completion Date:</span>
                    <span className="funding-value">
                      {new Date(selectedInvestment.expectedCompletion).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="investment-description-full">
                <h3>Business Description</h3>
                <p>{selectedInvestment.description}</p>
              </div>

              <div className="investment-features-full">
                <h3>Business Features</h3>
                <div className="features-grid">
                  {selectedInvestment.features.map((feature, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="investment-documents">
                <h3>Investment Documents</h3>
                <div className="documents-list">
                  <a href="#" className="document-link">
                    <span className="document-icon">📄</span>
                    <span className="document-name">Business Prospectus</span>
                  </a>
                  <a href="#" className="document-link">
                    <span className="document-icon">📄</span>
                    <span className="document-name">Financial Projections</span>
                  </a>
                  <a href="#" className="document-link">
                    <span className="document-icon">📄</span>
                    <span className="document-name">Market Analysis</span>
                  </a>
                  <a href="#" className="document-link">
                    <span className="document-icon">📄</span>
                    <span className="document-name">Legal Documentation</span>
                  </a>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="modal-invest-button"
                  onClick={() => handleInvestNow(selectedInvestment.id)}
                >
                  Invest Now
                </button>
                <button className="schedule-viewing-button">
                  Schedule Meeting
                </button>
                <button className="contact-manager-button">
                  Contact Business Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
