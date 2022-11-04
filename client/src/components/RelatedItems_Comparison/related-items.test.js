;
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RPList from './rp-list.jsx';
import YourOutfit from './your-outfit.jsx';

describe("Related Products list", function () {
  test("return the string, RPList, to the virtual dom", async () => {
    render(<RPList />);
    const text = screen.getByTestId("rpList");
    expect(text).toHaveTextContent("RPList");
  });
});

describe("Related Products list", function () {
  test("return the string, YourOutfit, to the virtual dom", async () => {
    render(<YourOutfit />);
    const text = screen.getByTestId("outfit");
    expect(text).toHaveTextContent("YourOutfit");
  });
});