;
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Reviews_List from './Reviews_List.jsx';
import Rating_Breakdown from './Rating_Breakdown.jsx';
import * as data from './data.json';

const server = setupServer(
  rest.get('/reviews/71697/500/relevant', (req, res, ctx) => {
    return res(ctx.status(200));
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Reviews_List.jsx", function(){
  test("loads two review tiles to the virtual dom", async() => {

    render(<Reviews_List reviews={data.reviews.results} totalReviews={data.reviews.count}/>);

    await waitFor(() => {screen.getByTestId('tiles')})

    expect(screen.getByTestId('tiles')).toHaveTextContent('really like it');
  });
});

describe("Reviews_List.jsx", function(){
  test("loads two review tiles to the virtual dom", async() => {

    render(<Reviews_List reviews={data.reviews.results} totalReviews={data.reviews.count}/>);

    await waitFor(() => {screen.getByTestId('tiles')})

    expect(screen.getByTestId('tiles')).toHaveTextContent('Test upload muti pictures');
  });
});

describe("Rating_Breakdown.jsx", function(){
  test("loads the average star rating for a specific product", async() => {

    render(<Rating_Breakdown reviewsMeta={data.reviewsMeta} reviews={data.reviews.results} ratings={data.reviewsMeta.ratings} rating={3.70}/>);

    await waitFor(() => {screen.getByTestId('star_rating')})

    expect(screen.getByTestId('star_rating')).toHaveTextContent('3.7');
  });
});

describe('end to end test to see if user clicked the "more" button', () => {
  test('click more button will perform correctly', () => {
      render(<Reviews_List reviews={data.reviews.results} totalReviews={data.reviews.count}/>);
      const tile = screen.getByTestId('tiles');
      const firstReview = data.reviews.results[0].summary;
      const secondReview = data.reviews.results[1].summary;
      const moreBtn = screen.getByTestId('more_button');

      expect(firstReview).toBeInTheDocument;
      expect(secondReview).toBeInTheDocument;

      fireEvent.click(moreBtn);
      const thirdReview = data.reviews.results[2].summary;
      const fourthReview = data.reviews.results[3].summary;
      expect(thirdReview).toBeInTheDocument;
      expect(fourthReview).toBeInTheDocument;
  })
})