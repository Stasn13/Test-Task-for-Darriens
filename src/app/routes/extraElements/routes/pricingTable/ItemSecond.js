import React from 'react';
import IntlMessages from 'util/IntlMessages';

const
  PriceItem = ({styleName, headerStyle, itemStyle, footerStyle}) => {
    return (
      <div className={`${styleName}`}>

        <div className={`${headerStyle}`}>
          <span className="price"><i className="zmdi zmdi-money"/>99</span>
          <h4 className="letter-spacing-base text-uppercase mb-0"><IntlMessages id="pricingTable.business"/>
          </h4>
        </div>

        <ul className={`package-items ${itemStyle}`}>
          <li>
            <i className="zmdi zmdi-translate zmdi-hc-fw"/>
            <span><IntlMessages id="pricingTable.easyTranslation"/></span>
          </li>
          <li>
            <i className="zmdi zmdi-font zmdi-hc-fw"/>
            <span><IntlMessages id="pricingTable.awesomeGoogleFonts"/></span>
          </li>
          <li>
            <i className="zmdi zmdi-hotel zmdi-hc-fw"/>
            <span><IntlMessages id="pricingTable.hotelBookingSystem"/></span>
          </li>
          <li>
            <i className="zmdi zmdi-mail-send zmdi-hc-fw"/>
            <span><IntlMessages id="pricingTable.emailComposeInterface"/></span>
          </li>
          <li>
            <i className="zmdi zmdi-pin zmdi-hc-fw"/>
            <span><IntlMessages id="pricingTable.locationFinderApp"/></span>
          </li>
        </ul>

        <div className="package-footer">
          <span className={`jr-link${footerStyle}`}><IntlMessages
            id="pricingTable.buyNow"/></span>
        </div>
      </div>
    )
  };

export default PriceItem;

