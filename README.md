# Instagram Image Resizer

Resize and optimise images for Instagram post sizes.

This library can take a single image path or a folder containing multiple images and create images ready to be publish as Instagram posts.

## Example

<table>
  <tr>
    <th>TYPE</th>
    <th>SOURCE IMAGE</th>
    <th>OUTPUT IMAGES</th>
    <th>INSTAGRAM POST</th>
  </tr>
  <tr>
    <td>Horizontal<br/>Image</td>
    <td>
      <img src="./test/files/src/horizontal3.jpeg" width="100" />
    </td>
    <td>
      <img src="./test/files/expected/horizontal3-1.jpg" width="100" /><br />
      <img src="./test/files/expected/horizontal3-2.jpg" width="100" /><br />
      <img src="./test/files/expected/horizontal3-3.jpg" width="100" />
    </td>
    <td>
      <img src="./docs/horizontal-preview.gif" width="200" />
    </td>
  </tr>
  <tr>
    <td>Square<br/>Image</td>
    <td>
      <img src="./test/files/src/square.jpeg" width="100" />
    </td>
    <td>
      <img src="./test/files/expected/square-1.jpg" width="100" />
    </td>
    <td>
      <img src="./docs/square-preview.png" width="200" />
    </td>
  </tr>
  <tr>
    <td>Vertical<br/>Image</td>
    <td>
      <img src="./test/files/src/vertical1.jpeg" width="100" />
    </td>
    <td>
      <img src="./test/files/expected/vertical1-1.jpg" width="100" />
    </td>
    <td>
      <img src="./docs/vertical-preview.png" width="200" />
    </td>
  </tr>
</table>

## TO DO

- [x] add commitlint
- [x] add husky to run commitlint
- [x] add .nvmrc
- [x] add lint + prettier
- [x] run lint on commit
- [x] integration tests
- [ ] write documentation
- [ ] write CONTRIBUTE documentation
- [ ] setup versioning
- [ ] setup pipeline
- [ ] publish first version