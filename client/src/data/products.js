const products = [
  {
    id: 9,
    name: 'ladies shirt',
    price: 5990,
    sku: 'PDX5000N-32',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/lshirt01.png',
      '/public/ItemPics/lshirt02.png',
      
    ],

    customizeLink: "/lshirt",
    inStock: false,
    viewDetails:'/product/9',
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
    id: 1,
    name: 'Blue Shirt',
    price: 5990,
    sku: 'PDX5000N-32',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/Public/ItemPics/Shirt1.png',
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
      '/public/ItemPics/denim02.png',
      '/public/ItemPics/denim03.png',
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
      '/public/ItemPics/SliitShirt2.png',

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
    name: 'Dress',
    price: 5990,
    sku: 'PDX5000N-35',
    sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/public/ItemPics/GreenDress.png',
      '/public/ItemPics/Dress02.png',
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
      '/public/ItemPics/redDress01.png',
      '/public/ItemPics/reddress02.png',
      
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
      '/public/ItemPics/Blouse01.png',
      
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