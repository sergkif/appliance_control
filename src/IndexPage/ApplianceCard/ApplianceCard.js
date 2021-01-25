import './ApplianceCard.css'

function ApplianceCard({ name, img, model }) {
  return (
    <div className="card applianceCard">
      <img src={img} className="card-img-top applianceCard-img" alt="oven"></img>
      <div className="card-body">
        <p className="card-title">{name ? name : `Model: ${model}`}</p>
      </div>
    </div>
  );
}

export default ApplianceCard;