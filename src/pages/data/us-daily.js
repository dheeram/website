import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import { FormatDate, FormatNumber } from '~components/utils/format'
import { SyncInfobox } from '~components/common/infobox'
import { Th, Td, Table } from '~components/common/table'

const ContentPage = ({ data }) => (
  <Layout
    title="US Historical Data"
    path="/data/us-daily"
    socialCard={{
      description: 'Cumulative record of our daily totals.',
    }}
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />

    <SyncInfobox />

    <Table>
      <caption>US Daily Cumulative Totals - 4 pm ET</caption>
      <thead>
        <tr>
          <Th alignLeft>Date</Th>
          <Th>States Tracked</Th>
          <Th>New Tests</Th>
          <Th>Positive</Th>
          <Th>Negative</Th>
          <Th>Pos + Neg</Th>
          <Th>Pending</Th>
          <Th>Current hospitalization</Th>
          <Th>Deaths</Th>
          <Th>Total Tests</Th>
        </tr>
      </thead>
      <tbody>
        {data.allCovidUsDaily.nodes.map(node => (
          <tr>
            <Td alignLeft>
              <FormatDate
                date={node.date}
                format="ccc LLL d yyyy"
                timezone={false}
              />
            </Td>
            <Td>{node.states}</Td>
            <Td>
              <FormatNumber number={node.totalTestResultsIncrease} />
            </Td>
            <Td>
              <FormatNumber number={node.positive} />
            </Td>
            <Td>
              <FormatNumber number={node.negative} />
            </Td>
            <Td>
              <FormatNumber number={node.positive + node.negative} />
            </Td>
            <Td>
              <FormatNumber number={node.pending} />
            </Td>
            <Td>
              <FormatNumber number={node.hospitalizedCurrently} />
            </Td>
            <Td>
              <FormatNumber number={node.death} />
            </Td>
            <Td>
              <FormatNumber number={node.totalTestResults} />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Layout>
)

export default ContentPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "us-daily" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidUsDaily(sort: { order: DESC, fields: date }) {
      nodes {
        totalTestResults
        totalTestResultsIncrease
        hospitalizedCurrently
        states
        positive
        pending
        negative
        hospitalized
        death
        date
      }
    }
  }
`
