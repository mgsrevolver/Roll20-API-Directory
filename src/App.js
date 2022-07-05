import React from 'react'
import PropTypes from 'prop-types'
import { fetchAllModsList, fetchMoreInformation } from './api'

import './App.css'

const APIkey = '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'
const allModsURL =
  'https://api.github.com/repos/Roll20/roll20-api-scripts/contents/'

const ModsType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _links: PropTypes.shape({
    self: PropTypes.string.isRequired,
    git: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }),
})

const ModsRow = ({ mods, onClick }) => (
  <>
    <tr key={mods.id}>
      <td>{mods.name}</td>
      <td>{mods.type}</td>
      <td>
        <button onClick={() => onClick(mods)}>More Information</button>
      </td>
    </tr>
  </>
)

ModsRow.propTypes = {
  mods: PropTypes.arrayOf(ModsType),
}

const ModsInfo = ({ name, _links }) => (
  <div>
    <h2>{name}</h2>
    <table>
      <tbody>
        {Object.keys(_links).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{_links[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

ModsInfo.propTypes = ModsType

function App() {
  const [mods, setMods] = React.useState([])
  const [selectedMods, selectedModsSet] = React.useState(null)

  React.useEffect(() => {
    fetchAllModsList().then((allModsListData) => {
      setMods(allModsListData)
    })
  }, [])

  /* const getMoreInfo = ({ mods }) => {
    this.setState(
      {
        modName: mods.name,
      },
      () => {
        fetch(
          `https://api.github.com/repositories/28607958/contents/${this.state.modName}/README.md`,
          {
            method: 'GET',
            headers: {
              Authorization: APIkey,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
      }
    )
  } */

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1em',
      }}
    >
      <h1 className="title">Roll20 Mods Directory</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80% 20%',
          gridColumnGap: '1rem',
        }}
      >
        <div>
          <table width="100%">
            <tbody>
              {mods.map((mods) => (
                <ModsRow
                  mods={mods}
                  onClick={(mods) => {
                    selectedModsSet(mods)
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
        {selectedMods && <ModsInfo {...selectedMods} />}
      </div>
    </div>
  )
}

export default App
