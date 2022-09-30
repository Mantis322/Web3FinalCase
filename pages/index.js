import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react"
import { ethers } from 'ethers'
import useConnection from '../hooks/useConnection'
import useContract from '../hooks/useContract'
import {finalcaseaddress, patikaadress} from '../config'
import finalcase from "../build/contracts/FinalCase.json"


export default function Home() {

    const [contractAddr, setContractAddr] = useState();
    const [bidAmount, setBidAmount] = useState();
    const [contractInfo, setContractInfo] = useState({
        address: "-",
        tokenName: "-",
        tokenSymbol: "-",
        highestBid: "-"
    });
    const [highestBidder, setHighestBidder]= useState();



    const connection = useConnection();
    const contract = useContract(finalcaseaddress, finalcase.abi);

    useEffect(() => {
        connection.connect()

    }, [connection.address])

    const getContractInfo = async (e) => {
        e.preventDefault();


        const tokenName = (await contract.getTokenName()).toString();
        const tokenSymbol = (await contract.getTokenSymbol()).toString();
        const tokenBid = (await contract.getTokenBid()).toString();
        const tokenBidder = (await contract.getTokenBidder()).toString();

        console.log(tokenName,tokenSymbol,tokenBid);

        setContractInfo({
            tokenName: tokenName,
            tokenSymbol: tokenSymbol,
            highestBid: tokenBid
        });
        setHighestBidder(tokenBidder);
    };

    const makeaBid = async (e) => {
        await contract.bid(`1`, { value: ethers.utils.parseEther(bidAmount) });
    }
    const withdraw = async (e) => {
        await contract.withdraw(`1`);
    }

    const endedTokenClaim = async (e) => {
        const tokenOwner = (await contract.getOwner).toString();
        if((connection.address) == (await contract.getOwner()).toString()){
            await contract.end(`1`);
        }else {
            console.log("You are not owner");
        }

    }


    return (

        <div className={styles.login_box}>
            <h2>TOKEN BID </h2>
            <form >
                <div className={styles.user_box} >
                    <input placeholder='Contract Adress Here' value={contractAddr} onChange={(e) => setContractAddr(e.target.value)} />
                </div>


                <a href="#/" onClick={getContractInfo} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Get Contract
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

                <div className={styles.user_box_bidest}  >
                    <input  placeholder='Highest Bider' disabled value={highestBidder}/>
                </div>


            </div>

            <h2>MAKE A BID </h2>


            <div className={styles.user_box_bid} >
                <input placeholder='Bid Amount Here' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
            </div>
            <form>
                <a href="#/" onClick={makeaBid} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Make a bid
                </a>
            </form>
            <form>
                <a href="#/" onClick={withdraw} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Withdraw
                </a>
            </form>

            <form>
                <a href="#/" onClick={endedTokenClaim} >
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
