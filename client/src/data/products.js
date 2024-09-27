const products = [
   {
    id: 1,
    name: 'Pink & White Shirt',
    price: 5990,
    sku: 'PDX5000N-32',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/Public/ItemPics/PinkShirt1.jpg',
      '/Public/ItemPics/PinkShirt0.jpg',
    ],

    customizeLink: "/shirts",
    inStock: false,
    viewDetails:'/product/1',
    category: "Men",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
       
  },
  {
    id: 2,
    name: 'Denim Shirt',
    price: 5990,
    sku: 'PDX5000N-33',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/denim03.jpg',
      '/public/ItemPics/demin02.jpg',
      '/public/ItemPics/denimshirt04.jpg',
    ],

    customizeLink: "/denimshirt",
    inStock: true,
    viewDetails:'/product/2',
    category: "Men",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
  {
    id: 3,
    name: 'T-Shirt',
    price: 5990,
    sku: 'HD5000N-25',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/SliitShirt2.jpg',
      '/public/ItemPics/SliitShirt03.jpg',
      '/public/ItemPics/SliitShirt2.jpg',
    ],

    customizeLink: "/shirts",
    inStock: true,
    viewDetails:'/product/3',
    category: "Men",
    
    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
  {
    id: 4,
    name: 'Green Dress',
    price: 5990,
    sku: 'PDX5000N-35',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/GreenDress.jpg',
      '/public/ItemPics/Dress02.jpg',
      '/public/ItemPics/Dress03.jpg',
    ],

    customizeLink: "/dress",
    inStock: false,
    viewDetails:'/product/4',
    category: "Women",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
  {
    id: 5,
    name: 'Party Dress',
    price: 5990,
    sku: 'PDX5000N-36',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/redDress02.jpg',
      '/public/ItemPics/reddress01.jpg',
      
    ],

    customizeLink: "/dress3",
    inStock: true,
    viewDetails:'/product/5',
    category: "Women",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
  {
    id: 6,
    name: 'Belly Button Blouse',
    price: 5990,
    sku: 'PDX5000N-37',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/Blouse01.jpg',
      
    ],

    customizeLink: "/blouse2",
    inStock: true,
    viewDetails:'/product/6',
    category: "Women",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
  {
    id: 7,
    name: 'White Pant',
    price: 5990,
    sku: 'PDX5000N-38',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/Cpant01.jpg',
      
    ],

    customizeLink: "/cottonpant",
    inStock: true,
    viewDetails:'/product/7',
    category: "Men",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
  {
    id: 8,
    name: 'Cargo Pant',
    price: 5990,
    sku: 'PDX5000N-39',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/pant01.jpg',
      '/public/ItemPics/pant.jpg'
    ],

    customizeLink: "/pant",
    inStock: true,
    viewDetails:'/product/8',
    category: "Men",

    details: {
      chest: '31.5 - 53.9 (XS - XL)',
      length: '36.5 - 39 (XS - XL)',
      shoulders: '11.625 - 12.5 (XS - XL)',
      material: 'Cotton/Polyester',
      color: 'Navy Blue',
      fitType: 'Regular Fit',
      stretch: 'No Stretch',
      style: 'Zipper/Buckle',
      modelSize: 'S',
      care: 'Normal Wash',
      note: 'Product colour may slightly vary due to photographic lighting sources or your monitor settings.'
    }
  },
   
  ];

  export default products;