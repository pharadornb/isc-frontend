


/* import component Table */
import AdminDashboardCheckAccountEstablishmentTable from './AdminDashboardCheckAccountEstablishmentTable';
// import AdminDashboardCheckOpenSkillTable from './AdminDashboardCheckOpenSkillTable';
// import AdminDashboardReceiptAndDisbursement from './AdminDashboardReceiptAndDisbursement';
// import ServiceRecipientsTable from './ServiceRecipientsTable';
// import ReceiptsCompanyTable from './ReceiptsCompanyTable';



function Tables(){
    return(
        <>
            <div className="col-lg-12">
                <div className="box_row4_right_in ">
                    {/*------table1-------*/}
                    <div className='container vboxTable overflow-auto'><AdminDashboardCheckAccountEstablishmentTable/></div>
                    {/*------table2-------*/}
                    {/* <div className='container vboxTable overflow-auto'><AdminDashboardCheckOpenSkillTable/></div> */}
                    {/*------table3-------*/}
                    {/* <div className='container vboxTable overflow-auto'><AdminDashboardReceiptAndDisbursement/></div> */}
                    {/*------table4-------*/}
                    {/* <div className='container vboxTable overflow-auto'><ServiceRecipientsTable /></div> */}
                    {/*------table5-------*/}
                    {/* <div className='container vboxTable overflow-auto'><ReceiptsCompanyTable /></div> */}
                </div>
            </div>
        </>
    )
}

export default Tables;