
export default function Filter() {
  return (
    <div>
      <h1>Filter</h1>
      <form>
        <fieldset>
          <legend>Order by</legend>
          <input type="radio" id="low-hight" name="order-by" value="low-hight" />
          <label htmlFor="low-hight">Tokens: Low-high</label>
          <br />
          <input type="radio" id="hight-low" name="order-by" value="hight-low" />
          <label htmlFor="hight-low">Tokens: High-low</label>
          <br />
          <input type="radio" id="name-a-z" name="order-by" value="name-a-z" />
          <label htmlFor="name-a-z">Name: A-Z</label>
          <br />
          <input type="radio" id="name-z-a" name="order-by" value="name-z-a" />
          <label htmlFor="name-z-a">Name: Z-A</label>
          <br />
          <input type="radio" id="group-a-z" name="order-by" value="group-a-z" />
          <label htmlFor="group-a-z">Group: A-Z</label>
          <br />
          <input type="radio" id="group-z-a" name="order-by" value="group-z-a" />
          <label htmlFor="group-z-a">Group: Z-A</label>
        </fieldset>
        <fieldset>
          <legend>Groups</legend>
          <input type="checkbox" id="group-a" name="group-a" value="group-a" />
          <label htmlFor="group-a">Group A</label>
          <br />
          <input type="checkbox" id="group-b" name="group-b" value="group-b" />
          <label htmlFor="group-b">Group B</label>
          <br />
          <input type="checkbox" id="group-c" name="group-c" value="group-c" />
          <label htmlFor="group-c">Group C</label>
          <br />
          <input type="checkbox" id="group-d" name="group-d" value="group-d" />
          <label htmlFor="group-d">Group D</label>
          <br />
          <input type="checkbox" id="group-e" name="group-e" value="group-e" />
          <label htmlFor="group-e">Group E</label>
          <br />
        </fieldset>
        <fieldset>
          <legend>Tokens</legend>
          <input type="checkbox" id="tokens-none" name="tokens-none" value="tokens-none" />
          <label htmlFor="none">None</label>
          <br />
          <input type="checkbox" id="tokens-1-15" name="tokens-1-15" value="tokens-1-15" />
          <label htmlFor="tokens-1-15">1-15</label>
          <br />
          <input type="checkbox" id="tokens-16-50" name="tokens-16-50" value="tokens-16-50" />
          <label htmlFor="tokens-16-50">16-50</label>
          <br />
          <input type="checkbox" id="tokens-more-50" name="tokens-more-50" value="tokens-more-50" />
          <label htmlFor="tokens-more-50">50+</label>
          <br />
        </fieldset>
      </form>
    </div>
  );
}
