import React from 'react'
import { Search, ChevronDown, Users, Building, BookOpen } from 'lucide-react'
import './ClubList.css'

const ClubList = () =>  {
  const societies = [
    {
      name: 'Physics Society',
      department: 'Physics',
      institute: 'University School of Applied Sciences',
      cluster: 'Health & Allied Sciences'
    },
    {
      name: 'Mechatronics Society',
      department: 'Mechanical Engineering',
      institute: 'University Institute of Engineering',
      cluster: 'Engineering & Technology'
    },
    {
      name: 'Automobile Engineers Society',
      department: 'Automobile Engineering',
      institute: 'University Institute of Engineering',
      cluster: 'Engineering & Technology'
    }
  ]

  return (
    <div className="dashboard-club">
      <aside className="sidebar-club">
        <div style={{ marginBottom: '32px' }}>
          <img src="/placeholder.svg" alt="Logo" width={120} height={40} />
        </div>
        
        <nav>
          <a href="#" className="nav-item">
            <Users className="mr-2" size={20} />
            <span style={{marginLeft:"15px"}}>Explore</span>
          </a>
          <a href="#" className="nav-item">
            <Building className="mr-2" size={20} />
            <span style={{marginLeft:"15px"}}>Events</span>
          </a>
          <a href="#" className="nav-item">
            <BookOpen className="mr-2" size={20} />
            <span style={{marginLeft:"15px"}}>Quiz</span>
          </a>
        </nav>
      </aside>

      <main className="main-content-club">
        <div className="stats-container-club">
          <div className="stat-card-club">
            <div className="stat-number-club">1000+</div>
            <div className="stat-label-club">Active members</div>
          </div>
          <div className="stat-card-club">
            <div className="stat-number-club">100</div>
            <div className="stat-label-club">University rooms</div>
          </div>
          <div className="stat-card-club">
            <div className="stat-number-club">24/7</div>
            <div className="stat-label-club">Event organizers</div>
          </div>
          <div className="stat-card-club">
            <div className="stat-number-club">50+</div>
            <div className="stat-label-club">Events each day</div>
          </div>
        </div>

        <div className="communities-card">
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Communities</h2>
          <p style={{ opacity: 0.9 }}>
            Discover a world of opportunities through our vibrant communities and connect with like-minded individuals
          </p>
        </div>

        <div className="search-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input
              className="search-input"
              placeholder="Search societies..."
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <button className="filter-button">
            Department
            <ChevronDown size={16} />
          </button>
          <button className="filter-button">
            Cluster
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="societies-table">
          <div className="table-header">
            <div>Name</div>
            <div>Department</div>
            <div>Institute</div>
            <div>Cluster</div>
            <div></div>
          </div>
          {societies.map((society, index) => (
            <div key={index} className="society-row">
              <div>{society.name}</div>
              <div>{society.department}</div>
              <div>{society.institute}</div>
              <div>{society.cluster}</div>
              <button className="join-button">Join now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
export default ClubList;