import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import styles from './Plans.module.css';
import { Link } from 'react-router-dom';
import ProfileCard from './ProfileCard';

const PlanCardList = ({ plans, ids }) => {

  // console.log(plans);
  const [filteredPlans, setFilteredPlans] = useState(plans);
  const [filters, setFilters] = useState({
    cat_risk: '',
    cat_type: '',
    priceRange: [0, 100000], // Initial price range
    searchText: '',
  });
  const [sortOption, setSortOption] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    if (
      !filters.cat_risk &&
      !filters.cat_type &&
      filters.priceRange[0] === 0 &&
      filters.priceRange[1] === 100000 &&
      !filters.searchText
    ) {
      setFilteredPlans([]);
      return;
    }

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
    <div style={{ marginTop: '4vh' }} >
      <div className={styles.clContainer}>
        <div className={styles.filterOptions}>
          <div className={styles.flex}>
            <label> Search: </label>
            <input
              type="text"
              name="searchText"
              value={filters.searchText}
              onChange={handleFilterChange}

            />
          </div>
          <div className={styles.flex}>
            <label>Filters:</label>
            <select name="cat_risk" value={filters.cat_risk} onChange={handleFilterChange}>
              <option value="">Risk</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">Sort by:</option>
              <option value="rating">Rating</option>
              <option value="total_orders">Total Orders</option>
            </select>
          </div>

          <div>
            <div className={styles.flex} style={{ width: '22vw' }}>
              Min: {filters.priceRange[0]}
              <Range
                _id='range'
                step={500}
                min={0}
                max={100000}
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
              <br />
              <div style={{ marginTop: '10px' }}>
                Max: {filters.priceRange[1]}
              </div>
            </div>
          </div>

        </div>
      </div>

      <br />

      {(filters.searchText && filteredPlans.length === 0) ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3>No data found</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className={styles.CardList}>
          {sortPlans().map((plan, index) => (
            <div key={index} style={{ width: '33%', padding: '10px' }}>
              <Link to={`/planDetail/${plan._id}`}>
                <ProfileCard plan={plan} ids={ids} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanCardList;