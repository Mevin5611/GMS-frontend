/* import React from 'react';
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

const MemberPDFDocument = ({ members }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 15, marginBottom: 10 }}>Member Details</Text>
        {members ? (
          members.map((member) => (
            <View key={member._id} style={styles.member}>
              <Text>Name: {member.name}</Text>
              <Text>Phone: {member.phone}</Text>
              <Text>Email: {member.email}</Text>
              <Text>Join Date: {format ( new Date(member.joindate), 'dd-MM-yyyy')}</Text>
            
            </View>
          ))
        ) : (
          <Text>No members to display</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default MemberPDFDocument;
 */