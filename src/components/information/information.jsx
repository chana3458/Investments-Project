import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./information.css";

export const Information = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="about-container">
      <div className={`hero-section2 ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-content">
          <h1>Transforming Real Estate Investment</h1>
          <p>Making premium real estate opportunities accessible to everyone</p>
          <button className="cta-button" onClick={() => navigate('/investments')}>
            Explore Opportunities
          </button>
        </div>
      </div>
      
      <div className={`mission-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="mission-content">
            <div className="mission-image">
              <img src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Team meeting" />
            </div>
            <div className="mission-text">
              <p className="highlight-text">
                We're on a mission to democratize access to high-quality real estate investments, 
                enabling individuals to build wealth through property without the traditional barriers.
              </p>
              <p>
                For too long, premium real estate investments have been accessible only to the wealthy 
                and well-connected. Our platform changes that by fractionalizing ownership, lowering 
                minimum investments, and providing transparent, professional management of each property.
              </p>
              <p>
                We believe that everyone deserves the opportunity to benefit from real estate's 
                potential for appreciation, cash flow, and portfolio diversification.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`values-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔍</div>
              <h3>Transparency</h3>
              <p>
                We provide complete visibility into every investment opportunity, 
                including detailed financials, risk assessments, and ongoing performance metrics.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Security</h3>
              <p>
                Your investments are protected through rigorous due diligence, 
                legal structures, and insurance policies designed to minimize risk.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">📊</div>
              <h3>Data-Driven</h3>
              <p>
                Our investment selection process combines advanced analytics with 
                expert human evaluation to identify properties with optimal return potential.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Accessibility</h3>
              <p>
                We've removed traditional barriers to entry, making it possible to 
                start investing in premium real estate with as little as $30,000.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                We prioritize properties and development projects that incorporate 
                sustainable practices and contribute positively to communities.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">💼</div>
              <h3>Professionalism</h3>
              <p>
                Our team brings decades of combined experience in real estate, 
                finance, and technology to ensure professional management of every investment.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`team-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="section-header">
            <h2>Our Leadership Team</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="David Cohen" />
              </div>
              <h3>David Cohen</h3>
              <p className="member-title">Chief Executive Officer</p>
              <p className="member-bio">
                With over 20 years of experience in real estate development and investment banking, 
                David leads our strategic vision and investment committee.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Sarah Levy" />
              </div>
              <h3>Sarah Levy</h3>
              <p className="member-title">Chief Investment Officer</p>
              <p className="member-bio">
                Sarah brings her expertise from managing a $2B real estate portfolio at a leading 
                investment firm to oversee our property acquisition and management strategy.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Michael Rosen" />
              </div>
              <h3>Michael Rosen</h3>
              <p className="member-title">Chief Technology Officer</p>
              <p className="member-bio">
                Michael leads our technology team, leveraging his background in fintech to create 
                a secure, transparent, and user-friendly investment platform.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Talia Ben-David" />
              </div>
              <h3>Talia Ben-David</h3>
              <p className="member-title">Head of Investor Relations</p>
              <p className="member-bio">
                Talia ensures our investors receive exceptional service and clear communication 
                throughout their investment journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`stats-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">$120M+</div>
              <div className="stat-label">Assets Under Management</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Active Investors</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">35+</div>
              <div className="stat-label">Properties in Portfolio</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">12.4%</div>
              <div className="stat-label">Average Annual Return</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`testimonials-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="section-header">
            <h2>What Our Investors Say</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                I've been investing in real estate for years, but this platform has simplified 
                the process while giving me access to properties I could never afford on my own.
                The returns have consistently exceeded my expectations.
              </p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Daniel Katz" />
                </div>
                <div className="author-info">
                  <h4>Daniel Katz</h4>
                  <p>Investor since 2020</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                As a first-time real estate investor, I was nervous about making such a significant 
                financial commitment. The team guided me through every step and helped me build a 
                diversified portfolio that generates consistent monthly income.
              </p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Rachel Goldman" />
                </div>
                <div className="author-info">
                  <h4>Rachel Goldman</h4>
                  <p>Investor since 2021</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">
                The transparency is what sets this platform apart. I can see exactly where my money 
                is invested, track performance in real-time, and access detailed reports that help 
                me make informed decisions about my investment strategy.
              </p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Joseph Levy" />
                </div>
                <div className="author-info">
                  <h4>Joseph Levy</h4>
                  <p>Investor since 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`faq-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How does real estate investment work on your platform?</h3>
              <p>
                Our platform allows you to invest in fractional ownership of premium real estate properties. 
                You can browse available opportunities, review detailed information about each property, 
                and invest with as little as $30,000. Once invested, you'll receive regular updates and 
                distributions based on the property's performance.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>What types of properties can I invest in?</h3>
              <p>
                We offer a diverse range of investment opportunities including residential apartment 
                complexes, commercial office buildings, retail spaces, industrial properties, and luxury 
                developments. Each property is carefully selected based on its potential for appreciation 
                and income generation.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>How are returns generated and distributed?</h3>
              <p>
                Returns come from two primary sources: regular income from property operations (such as 
                rental income) and appreciation in property value. Income distributions are typically 
                made quarterly, while appreciation is realized when a property is sold or refinanced.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>What are the risks involved?</h3>
              <p>
                Like all investments, real estate involves certain risks including market fluctuations, 
                property-specific issues, and economic factors. We mitigate these risks through thorough 
                due diligence, professional management, and diversification. Each investment opportunity 
                includes a detailed risk assessment to help you make informed decisions.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>How liquid are my investments?</h3>
              <p>
                Real estate investments are generally less liquid than stocks or bonds. Our investments 
                typically have a target hold period of 3-7 years. However, we're developing a secondary 
                market that will allow investors to sell their shares before the end of the hold period, 
                subject to certain conditions.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>How do you select properties for investment?</h3>
              <p>
                Our investment committee follows a rigorous selection process that evaluates hundreds 
                of potential properties. We analyze location, market trends, financial projections, 
                physical condition, and management requirements. Only about 3% of properties we review 
                ultimately become investment opportunities on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`cta-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Start Your Real Estate Investment Journey?</h2>
            <p>
              Join thousands of investors who are building wealth through our curated 
              real estate investment opportunities.
            </p>
            <div className="cta-buttons">
              <button className="primary-button" onClick={() => navigate('/investments')}>
                Browse Investments
              </button>
              <button className="secondary-button" onClick={() => navigate('/register')}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
