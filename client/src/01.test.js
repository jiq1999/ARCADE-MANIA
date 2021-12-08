import React from "react";
import { screen, render} from "@testing-library/react"

import * as data from "";
import LandingPage from "./components/Landing/Landing";


describe("Landing", () => {
    it("must display a title", () => {
        render(<LandingPage />);
        expect(screen.queryByText(/arcade/i)).toBeInTheDocument();
    })
})

/* describe("<Card />", () => {
  let Card;
  let [vg1, vg2,] = data;

  it('Debería renderizar un tag "img" y utilizar como source la imagen del personaje', () => {
    expect(Card(char1).find("img").at(0).prop("src")).toEqual(
      char1.imageUrl
    );
    expect(Card(char2).find("img").at(0).prop("src")).toEqual(
      char2.imageUrl
    );
    expect(Card(char3).find("img").at(0).prop("src")).toEqual(
      char3.imageUrl
    );
  });

  it('Debería renderizar un "p" que contenga el texto "ID: " más el id del personaje', () => {
    expect(Card(char1).find("p").at(0).text()).toBe(`ID: ${char1.id}`);
    expect(Card(char2).find("p").at(0).text()).toBe(`ID: ${char2.id}`);
    expect(Card(char3).find("p").at(0).text()).toBe(`ID: ${char3.id}`);
  });

  it('Debería renderizar un "p" que contenga el texto "Name: " más el nombre completo del personaje', () => {
    expect(Card(char1).find("p").at(1).text()).toBe(
      `Name: ${char1.fullName}`
    );
    expect(Card(char2).find("p").at(1).text()).toBe(
      `Name: ${char2.fullName}`
    );
    expect(Card(char3).find("p").at(1).text()).toBe(
      `Name: ${char3.fullName}`
    );
  });

  it('Debería renderizar un "p" que contenga el texto "Title: " más el titulo del personaje', () => {
    expect(Card(char1).find("p").at(2).text()).toBe(
      `Title: ${char1.title}`
    );
    expect(Card(char2).find("p").at(2).text()).toBe(
      `Title: ${char2.title}`
    );
    expect(Card(char3).find("p").at(2).text()).toBe(
      `Title: ${char3.title}`
    );
  });

  it('Debería renderizar un "p" que contenga el texto "Family: " más la familia del personaje', () => {
    expect(Card(char1).find("p").at(3).text()).toBe(
      `Family: ${char1.family}`
    );
    expect(Card(char2).find("p").at(3).text()).toBe(
      `Family: ${char2.family}`
    );
    expect(Card(char3).find("p").at(3).text()).toBe(
      `Family: ${char3.family}`
    );
  });
});
 */