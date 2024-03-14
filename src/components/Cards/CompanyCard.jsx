import './CompanyCard.css';

import { useNavigate } from 'react-router-dom';

import { ScrollToTopButton } from '../../styles/Buttons/ScrollToTopButton';
import { LikeCompany } from '../LikeButtonCompany/LikeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

<Tooltip id="my-tooltip" />;

export const CompanyCard = ({ company }) => {
  console.log('CompanyCard', company);
  const navigate = useNavigate();
  return (
    <div className="containerCompany">
      <img className="section-company__image" src={company.image} alt={company.name} />
      <div className="section-company__text">
        <h3 className="companyName">{company.companyName} </h3>
        <p className="companyDescription"> {company.description}</p>
        <div className="company-tags">
          <p className="companyType">{company.companyType}</p>
          <p className="companyServices">{company.companyServices}</p>
          <a href={`tel:+34${company.phoneNumber}`} className="companyPhone">
            {company.phoneNumber}
          </a>
          <a href={`mailto:${company.email}`} className="companyMail">
            {company.email}
          </a>
          <br />
          <br />
          <button
            className="button--blue"
            onClick={() => {
              navigate(`/companyDetail/${company._id}`);
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
