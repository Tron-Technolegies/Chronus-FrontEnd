import React from 'react'
import ShopPageHeader from "../../components/shop/ShopPageHeader"
import FiltersSection from '../../components/shop/FiltersSection'
import ProductPriceFilter from '../../components/shop/ProductPriceFilter'
import ShippingDetails from '../../components/shop/ShippingDetails'
import ProductsGrid from '../../components/shop/ProductsGrid'
import SearchBox from '../../components/shop/SearchBox'
const ShopPage = () => {
  return (
    <div>
    <ShopPageHeader/>
    <FiltersSection/>
    <ProductPriceFilter/>
    <ShippingDetails/>
    <ProductsGrid/>
    <SearchBox/>
    </div>
  )
}

export default ShopPage
