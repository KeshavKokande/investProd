import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import PlanCard from './FlipingCard';
import '../Plans/Plans.css';
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard';

const PlanCardList = ({ plans }) => {
  const [filteredPlans, setFilteredPlans] = useState(plans);
  const [filters, setFilters] = useState({
    cat_risk: '',
    cat_type: '',
    priceRange: [0, 10000], // Initial price range
    searchText: '',
  });
  const [sortOption, setSortOption] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = plans.filter((plan) => {
      if (filters.cat_risk && plan.risk !== filters.cat_risk) return false;
      if (
        filters.priceRange[0] &&
        parseFloat(plan.minInvestmentAmount) < parseFloat(filters.priceRange[0])
      )
        return false;
      if (
        filters.priceRange[1] &&
        parseFloat(plan.minInvestmentAmount) > parseFloat(filters.priceRange[1])
      )
        return false;
      if (
        filters.searchText &&
        !(
          plan.advisorId.includes(filters.searchText) ||
          plan.planName.toLowerCase().includes(filters.searchText.toLowerCase())
        )
      )
        return false;
      return true;
    });
    setFilteredPlans(filtered);
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handlePriceRangeChange = (values) => {
    setFilters({ ...filters, priceRange: values });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortPlans = () => {
    if (sortOption === 'rating') {
      return filteredPlans.sort(
        (a, b) => parseFloat(b.noOfSubscription) - parseFloat(a.noOfSubscription)
      );
    } else if (sortOption === 'total_orders') {
      return filteredPlans.sort(
        (a, b) => parseInt(b.noOfSubscription) - parseInt(a.noOfSubscription)
      );
    } else {
      return filteredPlans;
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="cl_container">
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ marginRight: '0.1rem' }}>
            Search:
            <input
              type="text"
              name="searchText"
              value={filters.searchText}
              onChange={handleFilterChange}
              style={{ width: '50%' }}
            />
          </div>
          <div style={{ marginRight: '0.1rem' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowFilterDropdown(!showFilterDropdown)}>Filters</button>
              {showFilterDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', border: '1px solid #ccc', zIndex: 1 }}>
                  <select name="cat_risk" value={filters.cat_risk} onChange={handleFilterChange}>
                    <option value="">Risk</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  {/* Add other filter options as needed */}
                  
                  <br />
                  
                  <label></label>
                  <select value={sortOption} onChange={handleSortChange}>
                    <option value="">Sort by:</option>
                    <option value="rating">Rating</option>
                    <option value="total_orders">Total Orders</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginRight: '0.1rem', marginBottom: '0.5rem' }}>
            Price Range:
            <Range
              step={500}
              min={0}
              max={10000}
              values={filters.priceRange}
              onChange={(values) => handlePriceRangeChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    backgroundColor: '#ccc',
                    borderRadius: '4px',
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '16px',
                    width: '16px',
                    backgroundColor: '#007bff',
                    borderRadius: '50%',
                    boxShadow: '0px 2px 6px #AAA',
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {sortPlans().map((plan, index) => (
          <div key={index} style={{ width: '33%', padding: '10px' }}>
            <Link to={`/plan_id/${plan._id}`}>
              <ProfileCard plan={plan} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCardList;
