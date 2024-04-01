/* import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format} from 'date-fns'


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    member: {
      marginBottom: 10,
      fontSize: 12,
    },
  });

function TransactionPDF({ members }) {
    
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Transactions</Text>
        {members ? (
          members.map((member) => (
            <View key={member._id} style={styles.member}>
              <Text>Name: {member.name}</Text>
              <Text>Phone: {member.phone}</Text>
              <Text>Payment Date:{format ( new Date(member.paymentdate), 'dd-MM-yyyy')}</Text>
              <Text>Paid Amount:{member.paidamount}</Text>
              <Text>Dues:{member.dues}</Text>
              <Text>Payment Method:{member.paymentmethod}</Text>

              
            </View>
          ))
        ) : (
          <Text>No members to display</Text>
        )}
      </View>
    </Page>
  </Document>
  )
}

export default TransactionPDF
 */