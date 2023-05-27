import CoinsSearch from './CoinsSearch'

const Home = ({ coins }) => {

    return (
        <div>
            <CoinsSearch coins={coins} />
        </div>
    )
}

export default Home