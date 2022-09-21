import './App.css';
import { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);
  const [isAttending, setIsAttending] = useState(false);

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      addGuest();
    }
  };
  function addGuest() {
    const newGuest = {
      firstName: firstName,
      lastName: lastName,
      isAttending: isAttending,
      id: Math.random().toPrecision(5),
    };
    console.log(newGuest);
    const newState = [newGuest, ...guests];
    setGuests(newState);
    setFirstName('');
    setLastName('');
    setIsAttending(false);
  }

  function deleteGuest(id) {
    /* const bog = guests.filter((obj) => {
      return obj.firstName !== id;
    }); */
  }

  function logGuests() {
    console.log(guests);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>wabsite</h1>
        <p>ha ha, welcome </p>
      </header>
      <div>
        <br />
        <div id="data-test-id=guest">
          <form>
            <label htmlFor="first">First name</label>
            <input
              id="first"
              value={firstName}
              onClick={() => setFirstName('')}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
            <label htmlFor="last">Last name</label>
            <input
              id="last"
              value={lastName}
              onClick={() => setLastName('')}
              onChange={(event) => setLastName(event.currentTarget.value)}
              onKeyPress={handleEnter}
            />
            <br />
            Attending?
            <input
              checked={isAttending}
              type="checkbox"
              onChange={(event) => setIsAttending(event.currentTarget.checked)}
            />
          </form>
          <button onClick={() => addGuest()}>Add guest</button>
          <button onClick={() => logGuests()}>Log guests</button>
        </div>
        <br />
        Wow, your guest's name is {firstName} {lastName}? bit weird
        <div>
          {guests.map((guest) => {
            return (
              <div key={guest.id}>
                <h3>{`Name: ${guest.firstName} ${guest.lastName}`}</h3>
                <p>Guest attending: {guest.isAttending ? 'yes' : 'no'}</p>
                <button
                  onClick={() => deleteGuest(guest.firstName)}
                >{`Delete ${guest.firstName} ${guest.lastName}`}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
