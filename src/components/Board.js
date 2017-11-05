import React, {PureComponent} from 'react';
import "../layouts/css/board.css";


export default class Board extends PureComponent {

  render() {

    const {onClick, board} = this.props; 
    console.log("BOARD", board)

    return (
        <div className="board" onClick={onClick}>
            <div className="board__image" style={{backgroundImage: `url(${board.featurePhotoURL})` }}></div>
            <div className="board__meta"><label>{board.fins} Fin</label>|<label>{board.dimensions}</label></div>
            <div className="board__name">{board.name}</div>
            <div className="board__price">${board.price}</div>
        </div>
    );
  }
}


// id: 1,
// userId: 1,
// region: 'Southern California',
// city: 'San Diego',
// name: `5'8" Rusty Dwart`,
// brand: `Rusty`,
// model: `Dwart`,
// price: '300',
// dimensions: ` 5'8" x 32" x 3" `,
// fins: "3",
// condition: "Good",
// description: "Description lorem ipsum dolar set amit",
// shaperInfo: "Shaper info lorem ipsum dolar set amit.",
// featurePhotoURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',
// photoOneURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',
// photoTwoURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',
// photoThreeURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',
// photoFourURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',
// photoFiveURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',
// photoSixURL: 'https://galvu7hf6k-flywheel.netdna-ssl.com/wp-content/uploads/2017/10/image-16.jpg',