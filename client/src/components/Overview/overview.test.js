import React from 'react';
import ProductInfo from './product-info.jsx';
import ImageGallary from './image-gallary.jsx';
import Overview from './overview.jsx';
import StyleSelector from './style-selector.jsx';
import QuantitySelector from './quantity-selector.jsx';
import AddToCart from './add-to-cart.jsx';
import MagnifyingArea from './magnifying-area.jsx';
import { totalReviewsAndAvgRating, QuantitySelectArr } from '../helperFunctions.jsx';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});


describe('test all overview components are rendered correctly', () => {
  test('product info component is rendered correctly', () => {
    var currentProduct = { name: 'product 1', category: 'shoes' };
    var styleObj = { sale_price: 140, original_price: 170 };
    render(<ProductInfo currentProduct={currentProduct} styleObj={styleObj} totalReviews={0} rating={3}/>);
    const productTest = screen.getByTestId('test-ProductInfo');
    const strike = productTest.querySelector('strike');
    const fiveStar = productTest.querySelector('.five-stars');
    expect(productTest).toHaveTextContent('Category > shoes');
    expect(productTest).toHaveTextContent('$');
    expect(productTest.textContent).not.toContain('Read All');
    expect(strike).toBeInTheDocument;
    expect(fiveStar).toBeInTheDocument;
  });

  test('product info component is rendered correctly under different circumstances', () => {
    var currentProduct = { name: 'product 1', category: 'shoes' };
    var styleObj = { sale_price: null, original_price: 170 };
    render(<ProductInfo currentProduct={currentProduct} styleObj={styleObj} totalReviews={100} />);
    const productTest = screen.getByTestId('test-ProductInfo');
    expect(productTest.textContent).toContain('Read All');
    expect(productTest).not.toContainHTML('<strike>');
  });

  test('image gallary component is rendered correctly', () => {
    var photos = [{
      "thumbnail_url": "https://images.unsplash.com/photo-1548133464-29abc661eb5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1548133464-29abc661eb5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    }];
    render(<ImageGallary photos={photos} section="overview" />);
    const imageTest = screen.getByTestId('test-ImageGallary');
    const image = imageTest.querySelector('img');
    const btn = imageTest.querySelector('button');
    expect(image).toBeInTheDocument;
    expect(btn).toBeInTheDocument;
  });

  test('image gallary component is rendered correctly under different circumstances', () => {
    var photos = [{
      "thumbnail_url": "https://images.unsplash.com/photo-1548133464-29abc661eb5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
      "url": "https://images.unsplash.com/photo-1548133464-29abc661eb5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
    }];
    render(<ImageGallary photos={photos} section="modal" />);
    const imageTest = screen.getByTestId('test-ImageGallary-modal');
    const image = imageTest.querySelector('img');
    const btn = imageTest.querySelector('#default-view');
    expect(image).toBeInTheDocument;
    expect(btn).toBeInTheDocument;
    expect(imageTest.textContent).toContain('')
  });

  test('add to cart component is rendered correctly', () => {
    var styleObj = {}
    render(<AddToCart styleObj={styleObj} />);
    expect(screen.queryByText('test-AddToCart')).toBeNull();
  });

  test('add to cart component is rendered correctly under different circumstances', () => {
    var styleObj = {
      "style_id": 444228,
      "name": "Black",
      "original_price": "40.00",
      "sale_price": null,
      "default?": true,
      "skus": {
        "2580562": {
          "quantity": 8,
          "size": "XS"
        },
        "2580563": {
          "quantity": 16,
          "size": "S"
        },
        "2580564": {
          "quantity": 17,
          "size": "M"
        },
        "2580565": {
          "quantity": 10,
          "size": "L"
        },
        "2580566": {
          "quantity": 15,
          "size": "XL"
        },
        "2580567": {
          "quantity": 6,
          "size": "XXL"
        }
      }
    };
    render(<AddToCart styleObj={styleObj} />);
    expect(screen.getByTestId('test-AddToCart')).not.toBeNull();
  });

  test('quantity selector component is rendered correctly', () => {
    render(<QuantitySelector quantity={8}/>);
    expect(screen.getByTestId('test-QuantitySelector')).not.toBeNull();
  });

  test('style selector component is rendered correctly', () => {
    const styleObj = {name: 'pink and purple'};
    const styles = [
      {
          "style_id": 444228,
          "name": "Black",
          "original_price": "40.00",
          "sale_price": null,
          "default?": true,
          "photos": [
              {
                  "thumbnail_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                  "url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
              }
          ]
      },
      {
          "style_id": 444229,
          "name": "Grey",
          "original_price": "40.00",
          "sale_price": null,
          "default?": false,
          "photos": [
              {
                  "thumbnail_url": "https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                  "url": "https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2057&q=80"
              }
          ]
      }];
    render(<StyleSelector styleObj={styleObj} styles={styles}/>);
    const style = screen.getByTestId('test-StyleSelector');
    const img = style.querySelector('img');
    expect(img).toBeInTheDocument;
  });
});

describe('helper functions are working correctly', () => {
  test('totalReviewsAndAvgRating is working correctly', () => {
    var result = totalReviewsAndAvgRating({
      "1": "3",
      "2": "7",
      "3": "2",
      "4": "2",
      "5": "11"
    });
    expect(result[0]).toBe(25);
    expect(result[1]).toBe("3.44");
  })
});

describe('end to end test to see if the user interaction is working as expected', () => {
  test('mouseover magnifying area will work well', () => {
    render(<MagnifyingArea />);
    const style = screen.getByTestId('test-MagnigyingArea');
    const div = style.querySelector('#magnifying-area');
    const img = style.querySelector('img');
    fireEvent.mouseDown(style, { pageX: 0 });
    fireEvent.mouseMove(img, { pageX: 26 })
    expect(img).toBeInTheDocument;
    expect(div).toBeInTheDocument;
  })
});

describe('end to end test to see if the user interaction is working as expected', () => {
  test('add to cart is working correctly', () => {
    var styleObj = {
      "style_id": 444228,
      "name": "Black",
      "original_price": "40.00",
      "sale_price": null,
      "default?": true,
      "skus": {
        "2580562": {
          "quantity": 8,
          "size": "XS"
        },
        "2580563": {
          "quantity": 16,
          "size": "S"
        },
        "2580564": {
          "quantity": 17,
          "size": "M"
        },
        "2580565": {
          "quantity": 10,
          "size": "L"
        },
        "2580566": {
          "quantity": 15,
          "size": "XL"
        },
        "2580567": {
          "quantity": 6,
          "size": "XXL"
        }
      }};
    render(<AddToCart styleObj={styleObj}/>);
    var style = screen.getByTestId('test-AddToCart');
    var btn = style.querySelector('#add-to-cart-btn');
    var size = style.querySelector('#size');
    fireEvent.click(btn);
    var style = size.style.borderColor;
    expect(size).toBeInTheDocument;
    expect(style).toBe('red');
  })
});








