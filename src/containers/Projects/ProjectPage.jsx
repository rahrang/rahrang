// React
import React from "react";

// node modules
// import { isUndefined, includes } from "lodash";
import isUndefined from "lodash/isUndefined";
import includes from "lodash/includes";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";

// components
import PROJECTS from "./Project_Info/info.js";
import {
  ColumnContainer,
  RowContainer,
  Container
} from "../components/Containers";
import { ProjectPageHeader, ProjectSectionHeader } from "../components/Headers";
import { Paragraph, ParagraphItem } from "../components/Texts";
import { IntButtonLink, ExtButtonLink, ProjLink } from "../components/Links";
import { Image } from "../components/Images";

export default class ProjectPage extends React.Component {
  componentDidMount() {
    this.redirectIfDoesntExist(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfDoesntExist(nextProps);
  }

  redirectIfDoesntExist = props => {
    let project = props.match.params.project_title;
    let all_projects = Object.keys(PROJECTS);
    if (!includes(all_projects, project)) {
      props.history.replace("/projects");
    }
  };

  render() {
    let project = this.props.match.params.project_title;
    let projectInfo = PROJECTS[project];

    if (isUndefined(project) || isUndefined(projectInfo)) {
      return null;
    }

    let mdFile = require(`./Project_Info/${projectInfo.key}.md`);

    let backLink = (
      <IntButtonLink to={"/projects"} fontSize="0.875rem">
        {"Back to All"}
      </IntButtonLink>
    );

    let externalLinks = Object.entries(projectInfo.links).map(extLink => {
      return (
        <ExtButtonLink
          key={extLink[0]}
          fontSize={"0.875rem"}
          href={extLink[1]}
          target="_blank"
        >
          {extLink[0]}
        </ExtButtonLink>
      );
    });

    return (
      <Container>
        <BodyContainer>
          <Markdown options={options}>{mdFile}</Markdown>
        </BodyContainer>
        <RowContainer>
          {backLink}
          {externalLinks}
        </RowContainer>
      </Container>
    );
  }
}

const BodyContainer = ColumnContainer.extend`
  margin: auto;
  width: 70%;
  padding: 0 0 1.25rem;
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const paddedHR = styled.hr`
  margin: 1rem 0;
  border: 1px solid #2980b9;
`;

const codeBlock = styled.code`
  color: #2980b9;
  font-size: 1.25rem;
`;

const options = {
  overrides: {
    p: {
      component: Paragraph
    },
    h1: {
      component: ProjectPageHeader
    },
    h2: {
      component: ProjectSectionHeader
    },
    img: {
      component: Image
    },
    li: {
      component: ParagraphItem
    },
    a: {
      component: ProjLink,
      props: {
        fontSize: "0.875rem"
      }
    },
    code: {
      component: codeBlock
    },
    hr: {
      component: paddedHR
    }
  }
};
