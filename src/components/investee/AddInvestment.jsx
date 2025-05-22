import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AddInvestment.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllInvesteesThunk } from "../../redux/Slices/investee/getAllInvesteesThunk"
import { addInvesteeThunk } from "../../redux/Slices/investee/addInvesteeThunk"
import { addInvestmentThunk } from "../../redux/Slices/Investments/addInvestmentThunk"

export const AddInvestment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  // Investment form state
  const [investment, setInvestment] = useState({
    title: "",
    price: "",
    minInvestment: "",
    term: "",
    roi: "",
    riskLevel: "",
    providerId: "",
    type: "",
    location: "",
    description: "",
    expected: "",
    completedInvestorCount: "",
    investmentProgress: "",
    images: "",
    features: "",
  })
  useEffect(() => {
    dispatch(getAllInvesteesThunk());
  }, []);

  const Allip = useSelector(state => state.investees.investees);
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Validate investment form
  const validate = () => {
    const errors = {}
    if (!investment.title.trim()) errors.title = "Title is required"
    if (!investment.price || Number(investment.price) <= 0)
      errors.price = "Price must be a positive number"
    if (!investment.minInvestment || Number(investment.minInvestment) <= 0)
      errors.minInvestment = "Minimum investment must be a positive number"
    if (!investment.term.trim()) errors.term = "Term is required"
    if (!investment.roi || Number(investment.roi) < 0)
      errors.roi = "ROI must be zero or positive"
    if (!investment.riskLevel.trim()) errors.riskLevel = "Risk level is required"
    if (!investment.providerId.trim()) errors.providerId = "Provider ID is required"
    if (!investment.type.trim()) errors.type = "Type is required"
    if (!investment.location.trim()) errors.location = "Location is required"
    if (!investment.description.trim() || investment.description.length < 10)
      errors.description = "Description must be at least 10 characters"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle login submit
  const  handleLogin = (e) => {
    console.log("Login submitted"+Allip)
    e.preventDefault()
    if (!username.trim() || !password.trim())
      setLoginError("Please enter username and password")
    else
    {
      // try {
      //   await dispatch(getAllInvesteesThunk(password));
     
      // } catch (error) {
       
      //   setLoginError(true);
      // }
      if (!Allip.some(ip => ip.id === password && ip.name === username)){
        setLoginError(<div>
          <p>You are not registered as an investment provider. Please register first.</p>
          <button className="register-button" onClick={() => navigate('/investeeRegister')}>
            Go to Register
          </button>
        </div>);
      }
      else
      {
        setLoginError("")
        setIsLoggedIn(true)
      }    }
    return
  }
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
    setLoginError("")
    setInvestment({
      title: "",
      price: "",
      minInvestment: "",
      term: "",
      roi: "",
      riskLevel: "",
      providerId: "",
      type: "",
      location: "",
      description: "",
      expected: "",
      completedInvestorCount: "",
      investmentProgress: "",
      images: "",
      features: "",
    })
    setFormErrors({})
  }
  // Handle investment form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setInvestment((prev) => ({ ...prev, [name]: value }))
  }
  const fillId= () => {
    setInvestment((prev) => ({ ...prev,providerId: password }))
  }
  // Handle investment form submit
  const handleSubmit = () => {
    setIsSubmitting(true)
    if (validate()) {
      dispatch(addInvestmentThunk(investment))
      console.log("Investment data:", investment)
      alert("Investment added successfully!")
      navigate("/home")
    }
    setIsSubmitting(false)
  }
  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleLogin} noValidate>
          <h2>Login</h2>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={loginError ? "input-error" : ""}
            autoComplete="username"
            autoFocus
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={loginError ? "input-error" : ""}
            autoComplete="current-password"
          />
          {loginError && <p className="error-message">{loginError}</p>}
          <button type="submit" onClick={()=>{fillId()} } className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    )
  }
  return (
    <div className="investment-wrapper">
      <header className="investment-header">
        <h2>Add New Investment</h2>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <form
        className="investment-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        noValidate
      >
        <div className="form-row">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Investment title"
            value={investment.title}
            onChange={handleChange}
            className={formErrors.title ? "input-error" : ""}
          />
          {formErrors.title && <p className="error-message">{formErrors.title}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="price">
            Price <span className="required">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            value={investment.price}
            onChange={handleChange}
            className={formErrors.price ? "input-error" : ""}
          />
          {formErrors.price && <p className="error-message">{formErrors.price}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="minInvestment">
            Minimum Investment <span className="required">*</span>
          </label>
          <input
            id="minInvestment"
            name="minInvestment"
            type="number"
            placeholder="Minimum investment"
            value={investment.minInvestment}
            onChange={handleChange}
            className={formErrors.minInvestment ? "input-error" : ""}
          />
          {formErrors.minInvestment && (
            <p className="error-message">{formErrors.minInvestment}</p>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="term">
            Term <span className="required">*</span>
          </label>
          <input
            id="term"
            name="term"
            type="text"
            placeholder="Term"
            value={investment.term}
            onChange={handleChange}
            className={formErrors.term ? "input-error" : ""}
          />
          {formErrors.term && <p className="error-message">{formErrors.term}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="roi">
            ROI (%) <span className="required">*</span>
          </label>
          <input
            id="roi"
            name="roi"
            type="number"
            placeholder="Return on investment"
            value={investment.roi}
            onChange={handleChange}
            className={formErrors.roi ? "input-error" : ""}
          />
          {formErrors.roi && <p className="error-message">{formErrors.roi}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="riskLevel">
            Risk Level <span className="required">*</span>
          </label>
          <input
            id="riskLevel"
            name="riskLevel"
            type="text"
            placeholder="Risk level"
            value={investment.riskLevel}
            onChange={handleChange}
            className={formErrors.riskLevel ? "input-error" : ""}
          />
          {formErrors.riskLevel && (
            <p className="error-message">{formErrors.riskLevel}</p>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="providerId">
            Provider ID <span className="required">*</span>
          </label>
          <input
            id="providerId"
            name="providerId"
            type="text"
            placeholder="Investment provider ID"
            value={investment.providerId}
            onChange={handleChange}
            className={formErrors.providerId ? "input-error" : ""}
          />
          {formErrors.providerId && (
            <p className="error-message">{formErrors.providerId}</p>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="type">
            Type <span className="required">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={investment.type}
            onChange={handleChange}
            className={formErrors.type ? "input-error" : ""}
          >
            <option value="">Select type</option>
            <option value="Retail">Retail</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Technology">Technology</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="other">other</option>
          </select>
          {formErrors.type && <p className="error-message">{formErrors.type}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="location">
            Location <span className="required">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Location"
            value={investment.location}
            onChange={handleChange}
            className={formErrors.location ? "input-error" : ""}
          />
          {formErrors.location && (
            <p className="error-message">{formErrors.location}</p>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={investment.description}
            onChange={handleChange}
            className={formErrors.description ? "input-error" : ""}
            rows={4}
          />
          {formErrors.description && (
            <p className="error-message">{formErrors.description}</p>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="expected">Expected</label>
          <input
            id="expected"
            name="expected"
            type="text"
            placeholder="Expected value"
            value={investment.expected}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="completedInvestorCount">Completed Investor Count</label>
          <input
            id="completedInvestorCount"
            name="completedInvestorCount"
            type="number"
            placeholder="Number of completed investors"
            value={investment.completedInvestorCount}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="investmentProgress">Investment Progress</label>
          <input
            id="investmentProgress"
            name="investmentProgress"
            type="text"
            placeholder="Investment progress"
            value={investment.investmentProgress}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="images">Images URLs</label>
          <input
            id="images"
            name="images"
            type="text"
            placeholder="Comma separated image URLs"
            value={investment.images}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="features">Features</label>
          <input
            id="features"
            name="features"
            type="text"
            placeholder="Features"
            value={investment.features}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Investment"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>dispatch(addInvestmentThunk(investment))}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
