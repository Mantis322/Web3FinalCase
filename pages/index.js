import styles from '../styles/Home.module.css'
import {useState, useEffect} from "react"
import {ethers} from 'ethers'
import useConnection from '../hooks/useConnection'
import useContract from '../hooks/useContract'
import {finalcaseaddress} from '../config.js'
import finalcase from "../build/contracts/FinalCase.json"
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";


export default function Home() {

    const [contractAddr, setContractAddr] = useState("");
    const [bidAmount, setBidAmount] = useState();
    const [contractInfo, setContractInfo] = useState({
        ended: "-",
        tokenName: "-",
        tokenSymbol: "-",
        highestBid: "-"
    });
    const [highestBidder, setHighestBidder] = useState("");
    const [contractTokens, setContractTokens] = useState([]);
    let selectedValue;
    const [deneme, setDeneme] = useState();


    const connection = useConnection();
    const contract = useContract(finalcaseaddress, finalcase.abi);

    useEffect(() => {
        connection.connect()


    }, [connection.address])

    useEffect(() => {


    }, [deneme]);

    useEffect(() => {
        console.log(contractAddr)

    }, [contractAddr]);


    const getContractInfo = async (e) => {


        let getAll = await contract.getAll();
        let countId = Number(await contract.count());

        setContractTokens((v) => [...v, {value: "", text: "Select a Contract"}]);

        for (let i = 0; i < countId; i++) {

            setContractTokens((v) => [...v, {value: i, text: getAll[i].name + " " + getAll[i].symbol}]);
        }


    }


    const getTokenTable = async (e) => {
        let getAll = await contract.getAll();
        let currentTime = Math.round(Date.now() / 1000);
        let endTime = Number(getAll[deneme].endTime);

        setContractInfo({
            tokenName: getAll[deneme].name,
            tokenSymbol: getAll[deneme].symbol,
            highestBid: Number(getAll[deneme].highestBid),

        })

        setHighestBidder(getAll[deneme].highestBidder)


    }


    const makeaBid = async (e) => {
        let getAll = await contract.getAll();
        let currentTime = Math.round(Date.now()/1000);
        let endTime = Number(getAll[deneme].endTime);
        if (bidAmount === undefined) {
            alert("Please enter a Amount")
        } else {
            if (currentTime< endTime){
                let getAll = await contract.getAll();

                if (getAll[deneme].ended == false) {
                    await contract.bid(deneme, {value: ethers.utils.parseEther(bidAmount)});
                } else {
                    alert("Bid Already Ended")
                }
            }else {
                alert("Time is end")
            }


        }


    }
    const withdraw = async (e) => {

        let isSuccess = await contract.withdraw(deneme);

        if (isSuccess){
            alert("Successfuly withdraw")
        }else{
            alert("Withdraw failed")
        }

    }

    const endedTokenClaim = async (e) => {
        let getAll = await contract.getAll();
        let currentTime = Math.round(Date.now() / 1000);
        let endTime = Number(getAll[deneme].endTime);
        let tokenOwner = await contract.getOwner();

            if (connection.address == tokenOwner) {
                if (currentTime >= endTime) {
                    await contract.end(deneme);
                } else {
                    alert(`There is still ${Math.floor((endTime-currentTime)/60)} min to end the bid`)
                }
            } else {
                alert("You are not owner");
            }



    }


    return (

        <div className={styles.login_box}>
            <h2>TOKEN BID </h2>
            <form>
                <div className={styles.user_box}>
                    <input placeholder='Contract Adress Here' onChange={(e) => setContractAddr(e.target.value)}/>
                </div>


                <a href="#/" onClick={getContractInfo}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Get Contract
                </a>
            </form>

            <div className={styles.select_box} >
                <select onChange={(e) => setDeneme(e.target.value)} name="tokens" id="token-select" >
                    {contractTokens.map((category, index) => {
                        return (
                            <option key={index} value={category.value}>
                                {category.text}
                            </option>
                        );
                    })}
                </select>
            </div>

            <form>
                <a href="#/" onClick={getTokenTable}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Get Token
                </a>
            </form>

            <div className={styles.table}>
                <div className={styles.tbl_header}>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                        <tr>

                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Highest Bid</th>

                        </tr>
                        </thead>
                    </table>
                </div>

                <div className={styles.tbl_content}>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                        <tr>

                            <td>{contractInfo.tokenName}</td>
                            <td>{contractInfo.tokenSymbol}</td>
                            <td>{contractInfo.highestBid}</td>

                        </tr>

                        </tbody>
                    </table>

                </div>

                <div className={styles.user_box_bidest}>
                    <input placeholder='Highest Bider' disabled value={highestBidder}/>
                </div>


            </div>

            <h2>MAKE A BID </h2>


            <div className={styles.user_box_bid}>
                <input placeholder='Bid Amount Here' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)}/>
            </div>
            <form>
                <a href="#/" onClick={makeaBid}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Make a bid
                </a>
            </form>
            <form>
                <a href="#/" onClick={withdraw}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Withdraw
                </a>
            </form>

            <form>
                <a href="#/" onClick={endedTokenClaim}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    End(Only for Token Owner)
                </a>
            </form>


        </div>


    )
}
