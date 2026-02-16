import React from 'react'
import ShopPageHeader from "../../components/shop/ShopPageHeader"
import FiltersSection from '../../components/shop/FiltersSection'
import ProductPriceFilter from '../../components/shop/ProductPriceFilter'
import ShippingDetails from '../../components/shop/ShippingDetails'
const ShopPage = () => {
  return (
    <div>
    <ShopPageHeader/>
    <FiltersSection/>
    <ProductPriceFilter/>
    <ShippingDetails/>
    </div>
  )
}

export default ShopPage
