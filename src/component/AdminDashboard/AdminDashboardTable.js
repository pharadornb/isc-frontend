


/* import component Table */
import AdminDashboardCheckAccountEstablishmentTable from './AdminDashboardCheckAccountEstablishmentTable';
import AdminDashboardCheckOpenSkillTable from './AdminDashboardCheckOpenSkillTable';
import AdminDashboardReceiptAndDisbursement from './AdminDashboardReceiptAndDisbursement';
import ServiceRecipientsTable from './ServiceRecipientsTable';
import ReceiptsCompanyTable from './ReceiptsCompanyTable';



function Tables(){
    return(
        <>
            <div className="col-md-12 col-lg-3 tb" >
                <label className="box_row4_left_text_in"><b>ทักษะยอดนิยม</b></label>
                <div className="box_row4_left_in"></div>
            </div>
            <div className="col-md-12 col-lg-9">
                <div className="box_row4_right_in ">
                    {/*------table1-------*/}
                    <AdminDashboardCheckAccountEstablishmentTable/>
                    {/*------table2-------*/}
                    <AdminDashboardCheckOpenSkillTable/>
                    {/*------table3-------*/}
                    <AdminDashboardReceiptAndDisbursement/>
                    {/*------table4-------*/}
                    <ServiceRecipientsTable />
                    {/*------table5-------*/}
                    <ReceiptsCompanyTable />
                </div>
            </div>
        </>
    )
}

export default Tables;